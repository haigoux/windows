import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const windowManager = defineStore('windowManager', () => {
    const activeWindow = ref(null)
    const windows = ref([])
   
    function _ranstr(len) {
        len = len || 32;
        var chars = 'abcdefg' // no numbers cus ids cant start with a number
        var maxPos = chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    function addWindow(component, props = {}) {
        const newWindow = {
            id: _ranstr(8),
            component,
            props,
            isActive: false
        }
        windows.value.push(newWindow)
        setActiveWindow(newWindow.id)
    }

    function setActiveWindow(id) {
        windows.value.forEach(win => {
            win.isActive = (win.id === id)
        })
        activeWindow.value = windows.value.find(win => win.id === id)
    }

    function closeWindow(id) {
        windows.value = windows.value.filter(win => win.id !== id)
        if (activeWindow.value && activeWindow.value.id === id) {
            activeWindow.value = null
        }
    }

    return {
        activeWindow: computed(() => activeWindow.value),
        windows: computed(() => windows.value),
        addWindow,
        setActiveWindow,
        closeWindow
    }
})