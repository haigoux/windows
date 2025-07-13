<script setup>
import nullPNG from '@/assets/null.png'
import minimizePNG from '@/assets/minimize.png'
import maximizePNG from '@/assets/maximize.png'
import closePNG from '@/assets/close.png'
</script>

<template>
    <div class="window-container">
        <div class="title-bar">
            <div class="name">
                <img v-if="icon" :src="icon" alt="icon" class="window-icon">
                <img v-else :src="nullPNG" alt="icon" class="window-icon">
                <span>{{ title }}</span>
            </div>
            <div class="buttons">
                <button class="minimize">
                </button>
                <button class="minimize">
                </button>
                <button class="minimize close">
                </button>
            </div>
        </div>
        <div class="window-content">
            <slot></slot>
        </div>
        <div class="resize-handle"></div>
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
    },
    data() {
        return {

        };
    },
    methods: {

    },
}
</script>

<style lang='scss' scoped>
.window-container {
    width: 800px; // 100% w and h for maximized
    height: 600px;
    border: 2px solid black;
    position: absolute;
    border: 2px solid #0078d4;
    border-radius: 5px; 
    overflow: hidden;
    

    .title-bar {
        // background-color: #0078d4;
        background: linear-gradient(0deg, #0078d4, #005a9e);
        color: white;
        // padding: 10px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px;
        border-bottom: 2px solid #005a9e6e;

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
            justify-content: flex-start;
            height: 100%;
            width: 100px;

            button {
                background: none;
                border: none;
                // padding: 0 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 50%;

                img {
                    width: 23px;
                    height: 23px;
                    cursor: pointer;
                }

                &.minimize {
                    background-color: green;
                    &:first-child{
                        border-bottom-left-radius: 5px;
                    }
                }

            }
        }
    }

    .window-content{
        padding: 10px;
        height: calc(100% - 35px); // Adjust height to account for title bar
        overflow-y: auto;
        background-color: #f0f0f0;
        border-left: 2px solid #000000;
        
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
}
</style>