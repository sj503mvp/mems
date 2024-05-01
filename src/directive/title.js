export default {
    // 指令的定义
    inserted: (el, binding) => {
        let offset = ''
        let scroll = ''
        if (binding.modifiers.multiLine) {
            offset = 'offsetHeight'
            scroll = "scrollHeight"
        } else {
            offset = 'offsetWidth'
            scroll = "scrollWidth"
        }
        let text = el.textContent.replace(/\s/g, "")
        if (el[offset] < (el[scroll])) {
            el.title = binding.value ? binding.value.title : text
        }
        const config = {
            attributeFilter:  ['id', 'class', 'style'], // 注意不要监听title 会无限触发监听器
            childList: true, // 子节点变化
            characterData: true, // 文本节点变化
            subtree: true, // 子节点的后代发生变化
        }
        // 当观察到变动时执行的回调函数
        const callback = (mutationsList, observer) => {
            let target = el
            if (target[offset] < (target[scroll])) {
                target.title = binding.value ? binding.value.title : el.textContent.replace(/\s/g, "")
            } else {
                target.title = ''
            }
        };
        const mutationObserver = new MutationObserver(callback);
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach(({ target }) => {
                if (target[offset] < (target[scroll])) {
                    target.title = binding.value ? binding.value.title : el.textContent.replace(/\s/g, "")
                } else {
                    target.title = ''
                }
            })

        })
        mutationObserver.observe(el,config)
        resizeObserver.observe(el)
        // 将监听器绑定到元素上,便于在不同周期调用监听器
        el.observe = resizeObserver
        el.mutationObserver = mutationObserver
    },
    update: (el, binding) => {
        let offset = ''
        let scroll = ''
        if (binding.modifiers.multiLine) {
            offset = 'offsetHeight'
            scroll = "scrollHeight"
        } else {
            offset = 'offsetWidth'
            scroll = "scrollWidth"
        }
        let text = el.textContent.replace(/\s/g, "")
        if (el[offset] < (el[scroll])) {
            el.title = binding.value ? binding.value.title : text
        }
    },
    // 指令与元素解绑时
    unbind(el) {
        el.removeAttribute('title')
        el.observe.unobserve(el)
        el.mutationObserver.disconnect()
    }
}
