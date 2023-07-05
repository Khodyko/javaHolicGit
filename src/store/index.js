import {createStore} from "vuex";
import {PostModule} from "@/store/PostModule.js";

export default createStore({
    modules: {
        post: PostModule
    }
})