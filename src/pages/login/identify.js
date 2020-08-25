import identify from "../../components/identify/index.vue"
export const identifyMixins = {
    components: {
        identify
    },
    data() {
        return {
            identifyCodes: "123465789", // 默认生成验证码的字符数
            identifyCode: "" // 当前的验证码
        };
    },
    mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
    },
    methods: {
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
            }
            // console.log(this.identifyCode);
        }
    }
}
