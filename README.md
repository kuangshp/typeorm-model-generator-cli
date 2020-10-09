## 使用场景
主要适用于先有了数据库的数据表,根据现有的数据表生成`typeorm`的实体类

## 使用方式

- 1、安装包

  ```shell
  npm install typeorm-model-generator-cli -D
  ```

* 2、在项目的`package.json`中配置命令

  ```js
  "scripts": {
    "db": "typeormCli init"
  }
  ```

* 3、运行命令
