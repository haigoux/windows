<script setup>
import nullPNG from '@/assets/null.png'
import minimizePNG from '@/assets/minimize.png'
import maximizePNG from '@/assets/maximize.png'
import closePNG from '@/assets/close.png'
</script>

<template>
    <div class="window-container" :class="{ minimized: _minimized, maximized: _maximized, active: active }" :id="id"
        :ref="id"
        :style="{ left: window_xy.x + 'px', top: window_xy.y + 'px', width: window_size.width + 'px', height: window_size.height + 'px' }">
        <div class="title-bar" @dblclick="maximize">
            <div class="name">
                <img v-if="icon" :src="icon" alt="icon" class="window-icon" draggable="false">
                <img v-else :src="nullPNG" alt="icon" class="window-icon" draggable="false">
                <span>{{ title }}</span>
            </div>
            <div class="buttons" @dblclick.prevent>
                <button class="minimize" @dblclick.prevent @click="minimize; $emit('minimize')">
                    

                </button>
                <button class="maximize" @dblclick.prevent @click="maximize">
                </button>
                <button class="close" @click="$emit('close')">
                </button>
            </div>
        </div>
        <div class="window-content">
            <slot></slot>
        </div>
        <div class="resize-handle" @mousedown="_resizing = true" v-if="resize">

        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'window'
        },
        icon: {
            type: String,
            default: null
        },
        resize: {
            type: Boolean,
            default: true
        },
        size: {
            type: Object,
            default: () => ({ width: 400, height: 300 })
        },
        id: {
            type: String,
            default: () => `window-${Math.random().toString(36).substring(2, 15)}`
        },
        active: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            window_xy: {
                x: 0,
                y: 0
            },
            window_size: {
                width: 400,
                height: 300
            },
            _titleBarHeld: false,
            _resizing: false,
            _maximized: false,
            _minimized: false,
            _parentRect: null,
            _positionBeforeMaximize: {
                x: 0,
                y: 0,
                width: 400,
                height: 300
            }
        };
    },
    methods: {
        ranstr(length) {
            let result = '';
            const characters = 'abcdef';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        setPosition(x, y) {
            let parentRect = this.$el.parentElement.getBoundingClientRect();
            // prevent from moving the window outside the parent element
            let x1 = Math.max(0, Math.min(x, parentRect.width - this.window_size.width));
            let y1 = Math.max(0, Math.min(y, parentRect.height - this.window_size.height));
            this.window_xy.x = x1;
            this.window_xy.y = y1;

        },
        setSize(width, height) {
            this.window_size.width = width;
            this.window_size.height = height;
        },
        maximize() {
            if (!this._maximized) { // if not maximized, maximize the window
                this._positionBeforeMaximize = { ...this.window_xy, ...this.window_size };
                this.setPosition(0, 0);
                this.setSize(window.innerWidth, window.innerHeight);
                // change css transition to also animate top and left
                this.$el.style.transition = 'width 0.125s, height 0.125s, left 0.125s, top 0.125s';
                this._maximized = true;
            } else {
                this.setSize(this._positionBeforeMaximize.width, this._positionBeforeMaximize.height);
                this.setPosition(this._positionBeforeMaximize.x, this._positionBeforeMaximize.y);
                this._maximized = false;
                setTimeout(() => {
                    this.$el.style.transition = 'width 0.125s, height 0.125s';
                }, 125); // reset transition after animation
            }
        },
        minimize() {
            // minimize the window
            if (!this._minimized) {
                // change animation css
                this.$el.style.transition = 'opacity 0.125s, transform 0.125s';
                this.$el.style.opacity = '0';
                this.$el.style.transform = 'scale(0.5)';
                this._minimized = true;
            } else {
                // restore the window
                this.$el.style.opacity = '1';
                this.$el.style.transform = 'scale(1)';
                this._minimized = false;
                // reset transition after animation
                setTimeout(() => {
                    this.$el.style.transition = 'width 0.125s, height 0.125s, left 0.125s, top 0.125s';
                }, 125);
            }
        }
    },
    mounted() {
        document.querySelector(`#${this.id}`).addEventListener('mousedown', (e) => {
            // if not left click, ignore
            if (e.button !== 0) {
                return;
            }
            if (this._maximized) {
                return
            }

            // if title bar 
            if (e.target.closest('.close') || e.target.closest('.minimize') || e.target.closest('.maximize')) {
                return;
            }
            if (e.target.closest('.title-bar')) {
                let clickOffset = {
                    x: e.clientX - this.$el.offsetLeft,
                    y: e.clientY - this.$el.offsetTop
                }
                document.onmousemove = (e) => {
                    let movePos = {
                        x: e.clientX - clickOffset.x,
                        y: e.clientY - clickOffset.y
                    };
                    this.setPosition(movePos.x, movePos.y);
                };
            }

            if (e.target.closest('.resize-handle')) {
                this._resizing = true;
                // remove the transition for resizing
                this.$el.style.transition = 'none';
                document.onmousemove = (e) => {
                    let offsetX = e.clientX - this.$el.offsetLeft;
                    let offsetY = e.clientY - this.$el.offsetTop;
                    this.setSize(Math.max(200, offsetX), Math.max(150, offsetY));
                };
            }
        })

        document.addEventListener('mouseup', () => {
            document.onmousemove = null;
            this._titleBarHeld = false;
            this._resizing = false;
            // add the transition back after resizing
            if (!this._maximized) {
                this.$el.style.transition = 'width 0.125s, height 0.125s';
            }
        });

    }
}
</script>

<style lang='scss' scoped>
.window-container {
    // defaults, get changed by js
    width: 400px;
    height: 300px;
    border: 2px solid black;
    position: absolute;
    // border: 2px solid #0078d4; // active color
    border: 2px solid #252525;

    border-radius: 10px;
    overflow: hidden;
    transition: width 0.125s, height 0.125s;

    z-index: 2;




    .title-bar {
        // background-color: #0078d4;
        background: linear-gradient(0deg, #7c7c7c, #b5b5b5);
        color: white;
        // padding: 10px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px;
        // border-bottom: 2px solid #005a9e6e;
        border-bottom: 2px solid #2525256e;
        cursor: move;

        user-select: none;

        .name {
            display: flex;
            align-items: center;
            padding-left: 10px;

            .window-icon {
                width: 16px;
                height: 16px;
                margin-right: 5px;
            }
        }

        .buttons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 100%;
            width: 100px;
            padding: 5px;
            gap: 5px;

            button {
                background: none;
                border: none;
                // padding: 0 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 20px;
                width: 20px;
                flex-shrink: 0;
                // background-color: red;

                filter: saturate(0.5);


                img {
                    width: 23px;
                    height: 23px;
                    cursor: pointer;
                }


                &.close {
                    background: linear-gradient(0deg, #ff7272, #ae0808c1);
                    border-radius: 50%;
                    box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.478);
                }

                &.minimize {
                    background: linear-gradient(0deg, #f0ff7d, #c0c000);
                    border-radius: 50%;
                    box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.478);
                }

                &.maximize {
                    background: linear-gradient(0deg, #7dff8a, #4caf50);
                    border-radius: 50%;
                    box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.478);
                }

                &:hover {
                    filter: brightness(0.9);
                    cursor: pointer;
                }


            }
        }
    }

    .window-content {
        // padding: 10px;
        height: calc(100% - 35px); // Adjust height to account for title bar
        overflow-y: auto;
        background-color: #f0f0f0;
        border-left: 2px solid #000000;
        user-select: none;

    }

    .resize-handle {
        width: 20px;
        height: 20px;
        background-color: transparent;
        position: absolute;
        bottom: -10px;
        right: -10px;
        cursor: se-resize; // Resize cursor
        border-radius: 50%;

        &:hover {
            background-color: rgba(53, 53, 53, 0.425);
        }
    }

    &.active {
        border: 2px solid #0078d4; // active border color
        z-index: 3;

        .title-bar {
            background: linear-gradient(0deg, #0078d4, #005a9e);
            border-bottom: 2px solid #005a9e6e;

            .buttons {
                button {
                    filter: saturate(1);
                }
            }
        }
    }

    &.maximized {
        border-radius: 0;
        border: none;
    }
}
</style>