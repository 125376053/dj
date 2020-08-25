<template>
    <div class="menu-wrapper">
        <template v-for="item in routes" v-if="!item.hidden&&item.children">
            <router-link
                v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow"
                :to="item.path+'/'+item.children[0].path"
                :key="item.children[0].name">
                <el-menu-item
                    class="parent"
                    :index="item.path+'/'+item.children[0].path"
                    :class="{'submenu-title-noDropdown':!isNest}"
                >
                    <i
                        :class="item.children[0].meta.icon"
                        v-if="item.children[0].meta&&item.children[0].meta.icon"
                    ></i>

                    <!--下拉子菜单 -->
                    <!--<span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">
                        {{item.children[0].meta.title}}
                    </span>-->
                    <span slot="title">
                        {{item.meta.title}}
                    </span>

                    <!--水平浮动子菜单 不显示title-->
                    <span v-if="collapse"></span>
                    <!--<el-tooltip v-if="collapse" effect="dark" :content="item.children[0].meta.title" placement="right"></el-tooltip>-->

                </el-menu-item>

            </router-link>
            <el-submenu v-else :index="item.name||item.path" :key="item.name" ref="test">
                <template slot="title">
                    <i :class="item.meta.icon" v-if="item.meta&&item.meta.icon"></i>
                    <span v-show="item.meta&&item.meta.title" :class="item.meta&&item.meta.icon?'':'falseIcon'" slot="title">
                        {{!collapse?item.meta.title:''}}
                    </span>
                </template>
                <template v-for="child in item.children" v-if="!child.hidden">
                    <sidebar-item
                        :is-nest="true"
                        class="nest-menu"
                        v-if="child.children&&child.children.length>0"
                        :routes="[child]"
                        :key="child.path"
                    ></sidebar-item>

                    <div v-else>
                        <router-link v-if="!child.meta.open" :to="item.path+'/'+child.path" :key="child.name">
                            <el-menu-item :index="item.path+'/'+child.path">
                                <i :class="child.meta.icon" v-if="child.meta&&child.meta.icon"></i>
                                <span v-if="child.meta&&child.meta.title" slot="title">
                                    <i class="el-icon-caret-right"></i>{{child.meta.title}}</span>
                            </el-menu-item>
                        </router-link>
                        <div v-else>
                            <el-menu-item :index="item.path+'/'+child.path">
                                <i :class="child.meta.icon" v-if="child.meta&&child.meta.icon"></i>
                                <span v-if="child.meta&&child.meta.title" slot="title">
                                    <i class="el-icon-caret-right"></i>{{child.meta.title}}</span>
                            </el-menu-item>
                        </div>
                    </div>

                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    export default {
        name: "SidebarItem",
        props: {
            routes: {
                type: Array
            },
            isNest: {
                type: Boolean,
                default: false
            },
            collapse:{
                type: Boolean,
                default: false
            }
        },
        methods: {
            hasOneShowingChildren(children) {
                const showingChildren = children.filter(item => {
                    return !item.hidden;
                });
                if (showingChildren.length === 1) {
                    return true;
                }
                return false;
            }
        }
    };
</script>




