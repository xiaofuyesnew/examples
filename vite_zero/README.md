# 从零开始搭建一个vite+vue3项目

> 当我们需要开始一个项目时总是会从既有的cli创建一个项目，然后根据README的提示，直接就开始了业务逻辑的编写。但这样，只是在搬砖。了解一下这些cli都干了什么，是学习技术细节的最佳途径。本文将详细介绍一下，从零开始一步步搭建一个Vite + Vue 3的脚手架。保证是保姆级别的，觉得好请给个赞哦。

## 创建项目文件结构

在你的电脑中找一个风水极佳的地方，创建一个目录（<project_name>替换成你喜欢的名字）：

```shell
# 创建项目目录
mkdir -p <project_name>

# 进入该目录
cd <project_name>

# 初始化npm配置
npm init -y

# 如果你用yarn，可以这样
yarn init -y
```

此时，目录下只有一个`package.json`的文件。

然后，按照下图文件结构创建对应的文件：

![](./docs/project_files.jpg)

至此，一个最基本的vite项目文件结构就已经准备好了。

## 安装依赖

紧接着，需要安装一系列的依赖，通过以下命令：

```shell
# 安装项目依赖
npm install vue@next vue-router@next vuex@next

# yarn的版本
yarn add vue@next vue-router@next vuex@next
```
项目需要的依赖，都需要加上`@next`来确保是使用的vue 3相关的版本。

```shell
# 安装开发依赖
npm install vite @vitejs/plugin-vue @vue/compiler-sfc --save-dev

# yarn的版本
yarn add vite @vitejs/plugin-vue @vue/compiler-sfc -D
```

开发中使用的工具依赖，vite相关的一些工具，vue语法解析和新语法编译工具。

## 文件内容的编写

- `jsconfig.json`

jsconfig.json文件指定根文件和JavaScript语言服务提供的功能选项。（具体可参考这篇文章：https://zhuanlan.zhihu.com/p/55644953）

如果不明白，直接留一个空json在里面即可：

```json
{}
```

- `package.json`

需要配置一下快捷启动的几个命令：

```json
{
  ...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  }
  ...
}
```

`dev`用于开发，`build`用于打包生产环境代码，`serve`用来在本地预览build打包的结果

- `vite.config.js`

vite的配置文件，最基本的配置项如下：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```

主要就是载入vite的vue插件。

- `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>project_name</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

项目的页面文件，跟webpack的项目不一样，vite项目下的html文件是放在根目录下的。

并且有两点不同：

1、加载程序主入口的script标签的type使用了module；

2、dev server的根目录与项目的根目录对应。

- `src/main.js`

程序的主入口：

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

createApp(App).use(store).use(router).mount("#app");
```

很好理解，跟vue 2的逻辑类似，只不过vue 3模块化之后，创建应用使用的是`createApp`方法。

- `src/App.vue`

vue的主组件，简单来说，可以只放一个`router-view`让router来接管。一些公共样式也可以写在这里。

```html
<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}
</style>
```

- `src/router/index.js`

路由，没什么好说的，直接上代码：

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('../views/Home.vue')
    }
  ]
})
```

这里的历史模式使用了`createWebHashHistory`hash模式，会在url生成hash值对应不同的路由，而另一种HTML5模式，需要将该域名下所有url在服务器中指向唯一的html，这一种用`createWebHistory`。

- `src/store/index.js`

利用vuex建立一个store，用于在组件之间传递数据。

```javascript
import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      test: 0
    }
  },
  mutations: {
    addTest(state) {
      state.test++
    }
  }
})
```

跟以前的vuex，没有太大差别，只是创建时使用了方法，而不是new一个对象。

---

到目前为止，配置部分的工作就基本完成，我们来写点业务。

- `src/views/Home.vue`

在这个主页中我们首先加入一个`Hello`组件，该组件接受一个String类型的属性，并显示出来。

然后，在它下方，放置一个显示store数值的div，和一个点击后+1的add按钮：

```html
<template>
  <Hello msg="Hello, Vite User Fallow!" />
  <div>{{ num }}</div>
  <button @click="add">add</button>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from "vuex"
import Hello from "../components/Hello.vue"

const store = useStore()

const num = computed(() => store.state.test)

const add = () => {
  store.commit('addTest')
}
</script>
```

可以看到与vue 2相比，vue 3的一些细节上发生了一些变化：

首先，template不再需要唯一根节点了，标签组织变得更符合直觉和扁平化；

其次，使用了setup这种composition API，代码的逻辑分块更清晰，组织更加灵活，喜欢偷懒的同学，甚至还能使用script-setup语法糖来更进一步简化代码。

对于script-setup，简单一点的理解就是在其中每个定义的变量和声明的函数，都会被暴露出去，例如上面的`Hello`组件、`num`变量和`add`方法，不需要显式地return，在template中也能正常使用。

- `src/components/Hello.vue`

```html
<template>
  <div class="wrap">
    <div class="greet">{{ msg }}</div>
  </div>
</template>

<style scoped>
</style>

<script setup>
import { defineProps } from "vue";

defineProps({
  msg: String
})
</script>
```

组件的属性传入使用`defineProps`。

---

最后，在命令行跑一下代码试试：

```shell
npm run dev

# 或yarn

yarn dev
```

在`localhost:3000`中打开页面，如果你看到如下图中所示，则你已经从零搭建起了一个vue 3的开发环境。

![](./docs/finish.png)

url中增加了hash，表示router正常；点击add按钮，数字增加，表示store正常。

Enjoy coding！👨‍💻
