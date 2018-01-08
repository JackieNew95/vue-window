var Main = Vue.component("Main", {
    template: `
        <div class="template">
            <div class="body">
            <div class="left"> 
                <router-view name="left"></router-view>
            </div>
            <div class="right"> 
                <router-view name="right"></router-view>
            </div>
            </div>
        </div>
    `
});
var Left = Vue.component("Left", {
    data() {
        return {
            menu: []
        }
    },
    computed: {
        parse() {
            var arr = [];
            for (var i in this.menu) {
                if (this.menu[i].pid == 0) {
                    arr.push(this.menu[i]);
                } else {
                    for (var j in arr) {
                        if (this.menu[i].pid == arr[j].id) {
                            if (arr[j].child) {
                                arr[j].child.push(this.menu[i])
                            } else {
                                arr[j].child = [];
                                arr[j].child.push(this.menu[i])
                            }
                        }
                    }
                }
            }
            return arr;
        }
    },
    watch: {
        $route() {
            var num = (this.$route.hash.slice(1));
            var pos = document.querySelector(".a" + num).offsetTop - 50;

            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({number: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({number: pos}, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.number.toFixed(0)
                })
                .start();

            animate()
        }
    },
    created() {
        fetch("./demo.txt").then(function (e) {
            return e.json();
        }).then((e) => {
            this.menu = e;
        })
    },
    //
    template: `
        <div> 
            <ul v-for="item in parse" :key="item.id">
                <router-link :to="'#'+item.id" tag="li">{{item.title}}</router-link>
                <router-link :to="'#'+i.id" tag="li" v-for="i in item.child" :key="i.id">{{i.title}}</router-link>
            </ul>
        </div>
    `
});
var Right = Vue.component("Right", {
    data() {
        return {
            data: ""
        }
    },
    template: `
        <div class="markdown-body"> 
               <div v-html="data"></div>
        </div>
    `,
    mounted() {
        fetch("./demo1.txt").then(function (e) {
            return e.text();
        }).then((e) => {
            this.data = e;
        })
    }
});
var Quick = Vue.component("Quick", {
    template: `
        <div style="position: absolute;top: 50px;">
            QuickQuickQuickQuickQuickQuickQuickQuickQuickQuick
            QuickQuickQuickQuickQuickQuickQuickQuickQuickQuickQuick
            QuickQuickQuickQuickQuickQuickQuickQuickQuickQuickQuickQuick
            QuickQuickQuickQuickQuickQuickQuickQuickQuickQuickQuickQuickQuickQuick
        </div>
    `
})