import {AuthInterceptor} from "./auth.interceptor";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    interceptor = new AuthInterceptor({} as unknown as Store, {} as unknown as Router);
  });

  // it('validate replaceDatesKeysInResponse method', () => {
  //   const created_at = new Date(), updated_at = new Date(), published_at = new Date();
  //   const example = {created_at, a: {b: {updated_at, c: [{published_at}]}}};
  //   const expected = {a: {b: {c: [{publishedAt: published_at}], updatedAt: updated_at,}}, createdAt: created_at,}
  //   interceptor.replaceDatesKeysInResponse(example)
  //   expect(example).toEqual(expected);
  // });

  it('should format response and remove data.attributes structure', function () {
    const example = {"data": {"posts": {"data": [{"id": "25", "attributes": {"title": "hfycjfqwsikzngrojlsw", "name": "hfycjfqwsikzngrojlswlecjs", "body": "sesfbbzavyhiklouwwtr", "comments": 0, "likes": 0, "views": 0, "createdAt": "2023-05-03T08:37:26.276Z", "updatedAt": "2023-05-03T08:37:26.276Z", "publishedAt": "2023-05-03T08:37:26.266Z", "enable": true, "banner": {"data": {"url": "https://test.com"}}, "author": {"data": {"id": 1, "attributes": {"username": "asdfasdfe", "avatarUrl": "asdwefsvsdf"}}}, "tags": {"data": [{"id": "13", "attributes": {"name": "c++"}}, {"id": "55", "attributes": {"name": "arduino"}}]}}}], "meta": {"pagination": {"total": 30}}}}};
    const expected = {"data": {"meta_posts": {"pagination": {"total": 30}}, "posts": [{"author": {"avatarUrl": "asdwefsvsdf", "id": 1, "username": "asdfasdfe"}, "banner": {"data": {"url": "https://test.com"}}, "body": "sesfbbzavyhiklouwwtr", "comments": 0, "createdAt": "2023-05-03T08:37:26.276Z", "enable": true, "id": "25", "likes": 0, "name": "hfycjfqwsikzngrojlswlecjs", "publishedAt": "2023-05-03T08:37:26.266Z", "tags": [{"id": "13", "name": "c++"}, {"id": "55", "name": "arduino"}], "title": "hfycjfqwsikzngrojlsw", "updatedAt": "2023-05-03T08:37:26.276Z", "views": 0}]}};
    expect(interceptor.formatResponseObjects(example)).toEqual(expected);
  });

  it('should format response and remove data.attributes structure (from error)', function () {
    const example = {
      "data": {
        "recentComments": [
          {
            "body": "Buen artículo, solo quería aportar algunas alternativas a nvm\n\n\n1. [fnm](https://github.com/Schniz/fnm) mi herramienta favorita\n2. [volta](https://volta.sh)",
            "email": null,
            "name": null,
            "user": {
              "data": {
                "id": "200",
                "attributes": {
                  "username": "yacosta738",
                  "avatarUrl": "https://avatars.githubusercontent.com/u/33158051?v=4",
                  "__typename": "UsersPermissionsUser"
                },
                "__typename": "UsersPermissionsUserEntity"
              },
              "__typename": "UsersPermissionsUserEntityResponse"
            },
            "post": {
              "data": {
                "id": "173",
                "attributes": {
                  "title": "Instalar Node como un PRO",
                  "name": "instalar-node-como-un-proswgns",
                  "body": "Generalmente los nuevos desarrolladores que llegan a *node.js*, cuando enfrentan el desafío de instalar *node.js*, van a la clásica de instalar una versión determinada en su sistema operativo (SO). Pues en está no es la mejor forma de instalar *node.js*, la mejor forma es utilizando *nvm* (Node Virtual Manager) que permite cambiar entre versiones de *node.js* de manera muy fácil sin necesidad de desinstalar e instalar *node.js*.\n\n## ¿Qué es *nvm*?\n\n*nvm* es un gestor de versiones para *node.js*, que está diseñado para ser instalado por usuarios e invocado en un terminal. *nvm* se integra con la mayoría de los terminales existentes (sh, dash, ksh, zsh, bash, etc), en particular con las plataformas: unix, macOS y windows WSL.\n\n## Instalar *nvm*\n\nPara instalar o actualizar *nvm*, se debe ejecutar el [script de instalación](https://github.com/nvm-sh/nvm/blob/v0.39.3/install.sh). Para esto, se puede descargar dicho script o sencillamente ejecutar uno de los siguientes comandos:\n\n```\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash\n```\n```\nwget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash\n```\n\nEjecutar cualquiera de los comandos anteriores, va a descargar y ejecutar el script de manera automática. El script clona el repositorio *nvm* en la carpeta *~/.nvm* y luego agrega automáticamente la configuración de *nvm* a cada uno de los perfiles del usuario (*~/.bash_profile*, *~/.zshrc*, *~/.profile*, or *~/.bashrc*).\n\n## Enlaces\n\n- [*nvm* en github](https://github.com/nvm-sh/nvm)\n\n## Conclusiones\n\nEspero les sirva de ayuda la próxima vez que necesiten instalar *node.js* de manera local. Con *nvm* no solo lo hace mucho más sencillo, sino que nos permite transitar entre versiones de *node.js* de una manera muy fácil.\n\nCualquier dato o sugerencia extra que quieran agregar al artículo, no duden dejarlo en los comentarios.\n\n> Happy coding!!!",
                  "__typename": "Post"
                },
                "__typename": "PostEntity"
              },
              "__typename": "PostEntityResponse"
            },
            "createdAt": "2023-04-03T15:02:33.000Z",
            "updatedAt": "2023-04-06T12:16:08.000Z",
            "__typename": "Comment"
          },
          {
            "body": "Hola comunidad, Les sugiero el uso de estas herramientas para el manejo de varias versiones de nodejs.\n\n1. [fnm](https://github.com/Schniz/fnm) mi herramienta favorita\n2. [volta](https://volta.sh)\n3. [nvm](https://github.com/nvm-sh/nvm)",
            "email": null,
            "name": null,
            "user": {
              "data": {
                "id": "200",
                "attributes": {
                  "username": "yacosta738",
                  "avatarUrl": "https://avatars.githubusercontent.com/u/33158051?v=4",
                  "__typename": "UsersPermissionsUser"
                },
                "__typename": "UsersPermissionsUserEntity"
              },
              "__typename": "UsersPermissionsUserEntityResponse"
            },
            "post": {
              "data": {
                "id": "165",
                "attributes": {
                  "title": "Cómo instalar el archivo node.tar.xz en Linux?",
                  "name": "como-instalar-el-archivo-nodetarxz-en-linuxjsynq",
                  "body": "Pasos para descargar e instalar node en ubuntu\n\nPaso 1: descargue el archivo de node .tar.xz más reciente o recomendado desde https://nodejs.org/es/\n\no puede descargar la versión de node v16.18.0 (archivo .tar.xz) directamente desde aquí ->\n\nhttps://nodejs.org/dist/v16.18.0/node-v16.18.0-linux-x64.tar.xz\n\nPaso 2: Vaya al directorio en el que se descargó (archivo .tar.xz).\n\nEn mi caso --> /Downloads\n\nPaso 3: Actualice los repositorios del sistema\n\nsudo apt update\n\nPaso 4: Instale el paquete xz-utils\n\nsudo apt install xz-utils\n\nPaso 5: para extraer el archivo .tar.xz\n\nsudo tar -xvf nombre_del_archivo\n\nEn mi caso --> sudo tar -xvf node-v16.18.0-linux-x64.tar.xz\n\nPaso 6: sudo cp -r nombre_directorio/{bin,include,lib,share} /usr/\n\nEn mi caso --> sudo cp -r node-v16.18.0-linux-x64/{bin,include,lib,share} /usr/\n\nPaso 7: actualice la ruta export PATH=/usr/node_nombre_directorio/bin:PATH\nEn mi caso --> export PATH=/usr/node-v16.18.0-linux-x64/bin:PATH\n\nPaso 8: Comprobar la versión del node\n\nnode --versión\n\nResultado En mi caso -> v16.18.0",
                  "__typename": "Post"
                },
                "__typename": "PostEntity"
              },
              "__typename": "PostEntityResponse"
            },
            "createdAt": "2023-04-03T14:58:55.000Z",
            "updatedAt": "2023-04-06T12:16:08.000Z",
            "__typename": "Comment"
          },
          {
            "body": "Lo estuve usando hasta que empesé a usar asdf. Igual nvm esta bueno.",
            "email": null,
            "name": null,
            "user": {
              "data": {
                "id": "17",
                "attributes": {
                  "username": "eduinlight",
                  "avatarUrl": "https://avatars2.githubusercontent.com/u/32907001?v=4",
                  "__typename": "UsersPermissionsUser"
                },
                "__typename": "UsersPermissionsUserEntity"
              },
              "__typename": "UsersPermissionsUserEntityResponse"
            },
            "post": {
              "data": {
                "id": "173",
                "attributes": {
                  "title": "Instalar Node como un PRO",
                  "name": "instalar-node-como-un-proswgns",
                  "body": "Generalmente los nuevos desarrolladores que llegan a *node.js*, cuando enfrentan el desafío de instalar *node.js*, van a la clásica de instalar una versión determinada en su sistema operativo (SO). Pues en está no es la mejor forma de instalar *node.js*, la mejor forma es utilizando *nvm* (Node Virtual Manager) que permite cambiar entre versiones de *node.js* de manera muy fácil sin necesidad de desinstalar e instalar *node.js*.\n\n## ¿Qué es *nvm*?\n\n*nvm* es un gestor de versiones para *node.js*, que está diseñado para ser instalado por usuarios e invocado en un terminal. *nvm* se integra con la mayoría de los terminales existentes (sh, dash, ksh, zsh, bash, etc), en particular con las plataformas: unix, macOS y windows WSL.\n\n## Instalar *nvm*\n\nPara instalar o actualizar *nvm*, se debe ejecutar el [script de instalación](https://github.com/nvm-sh/nvm/blob/v0.39.3/install.sh). Para esto, se puede descargar dicho script o sencillamente ejecutar uno de los siguientes comandos:\n\n```\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash\n```\n```\nwget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash\n```\n\nEjecutar cualquiera de los comandos anteriores, va a descargar y ejecutar el script de manera automática. El script clona el repositorio *nvm* en la carpeta *~/.nvm* y luego agrega automáticamente la configuración de *nvm* a cada uno de los perfiles del usuario (*~/.bash_profile*, *~/.zshrc*, *~/.profile*, or *~/.bashrc*).\n\n## Enlaces\n\n- [*nvm* en github](https://github.com/nvm-sh/nvm)\n\n## Conclusiones\n\nEspero les sirva de ayuda la próxima vez que necesiten instalar *node.js* de manera local. Con *nvm* no solo lo hace mucho más sencillo, sino que nos permite transitar entre versiones de *node.js* de una manera muy fácil.\n\nCualquier dato o sugerencia extra que quieran agregar al artículo, no duden dejarlo en los comentarios.\n\n> Happy coding!!!",
                  "__typename": "Post"
                },
                "__typename": "PostEntity"
              },
              "__typename": "PostEntityResponse"
            },
            "createdAt": "2023-03-23T17:51:43.000Z",
            "updatedAt": "2023-03-23T17:52:47.000Z",
            "__typename": "Comment"
          },
          {
            "body": "agregar que al momento de cambiar version de java, también hay que cambiar version de javac, para que se pueda desarrollar bien.\n\nesto se hace igual que el comando de cambio de java, pero se agrega la c :D\n\n\"sudo update-alternatives --config javac\n\"",
            "email": null,
            "name": null,
            "user": {
              "data": {
                "id": "191",
                "attributes": {
                  "username": "cpina00",
                  "avatarUrl": "https://avatars.githubusercontent.com/u/2441821?v=4",
                  "__typename": "UsersPermissionsUser"
                },
                "__typename": "UsersPermissionsUserEntity"
              },
              "__typename": "UsersPermissionsUserEntityResponse"
            },
            "post": {
              "data": {
                "id": "4",
                "attributes": {
                  "title": "Cambiar entre versiones de Java en Ubuntu",
                  "name": "cambiar-entre-versiones-de-java-en-ubuntu",
                  "body": "Usualmente cuando se trabaja en varios proyectos, ocurre que se cuenta con diferentes versiones de **Java** y ciertos proyectos usan una versión y otros otra, esto lleva a la pregunta: Como podemos cambiar la versión por defecto de **Java** en el sistema **Ubuntu**. Pues a continuación y con un sencillo paso se mostrará como\n\n## Cambiar versión por defecto de Java\n\nEjecuta la siguiente línea de comando en un terminal:\n\n```\nsudo update-alternatives --config java\n```\n\nEsto mostrará las versiones disponibles en el sistema, algo semejante a la siguiente tabla:\n\n```\nThere are 2 choices for the alternative java (providing /usr/bin/java).\n\n  Selection    Path                                            Priority   Status\n------------------------------------------------------------\n* 0            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      1111      auto mode\n  1            /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java   1081      manual mode\n\nPress <enter> to keep the current choice[*], or type selection number: 0\n```\n\nY como se puede ver, el comando se queda esperando para seleccionar la versión que se desea elegir por defecto. De esta manera y con un solo y sencillo comando pueden cambiar la versión de **Java** en **Ubuntu**.\n\nHappy coding!",
                  "__typename": "Post"
                },
                "__typename": "PostEntity"
              },
              "__typename": "PostEntityResponse"
            },
            "createdAt": "2023-01-09T15:42:48.000Z",
            "updatedAt": "2023-01-09T15:42:48.000Z",
            "__typename": "Comment"
          },
          {
            "body": "gracias! me sirvió para entender los guards",
            "email": null,
            "name": null,
            "user": {
              "data": {
                "id": "189",
                "attributes": {
                  "username": "sadalsuud",
                  "avatarUrl": "https://avatars.githubusercontent.com/u/2110828?v=4",
                  "__typename": "UsersPermissionsUser"
                },
                "__typename": "UsersPermissionsUserEntity"
              },
              "__typename": "UsersPermissionsUserEntityResponse"
            },
            "post": {
              "data": {
                "id": "68",
                "attributes": {
                  "title": "Guards en Angular, ¿Cómo funcionan?",
                  "name": "guards-en-angular-como-funcionan",
                  "body": "# Que es un Guard\n\nLos Guards en Angular, son de alguna manera: middlewares que se ejecutan antes de cargar una ruta y determinan si se puede cargar dicha ruta o no. Existen 4 tipos diferentes de Guards (o combinaciones de estos) que son los siguientes:\n\n1. (*CanActivate*) Antes de cargar los componentes de la ruta.\n2. (*CanLoad*) Antes de cargar los recursos (assets) de la ruta.\n3. (*CanDeactivate*) Antes de intentar salir de la ruta actual (usualmente utilizado para evitar salir de una ruta, si no se han guardado los datos).\n4. (*CanActivateChild*) Antes de cargar las rutas hijas de la ruta actual.\n\nComo middleware, estos componentes se ejecutan de manera intermedia antes de determinadas acciones y si retorna `true` la ruta seguiría su carga normal, en caso negativo, el Guard retornaría `false` y la ruta no se cargaría. Generalmente en caso de que no se cumpla la condición del Guard, se suele hacer una redirección a la ruta anterior o a una ruta definida como la interfaz de autenticación.\n\n## ¿Por qué utilizar Guards?\n\nUna de las ventajas de utilizarlos, es que al no cargar la ruta evitamos que los usuarios vean una interfaz a la que no tienen acceso (aunque sea por unos pocos milisegundos). Por otra parte, con estos componentes es posible estructurar el código de la aplicación de una manera más organizada y donde la lógica de la ruta está en la ruta en sí y la lógica de permisos y acceso a recursos se encuentra aislada en estos componentes.\n\n# ¿Cómo utiliza Angular los Guards?\n\nEmpezaremos con la creación de un Guard. Para crear un Guard es posible hacerlo de manera manual, pero angular-cli provee un generador muy bueno y que de manera automática genera el Guard junto a las pruebas del mismo. Para generar el Guard solo es necesario abrir un terminal en la carpeta que se desea y ejecutar el siguiente comando:\n\n```\n$ ng generate guard <guard-name>\n```\n\nUna vez ejecutado el comando anterior, dan a elegir cuál de los 4 tipos de Guard deseas generar y una vez seleccionado, este es creado junto a su archivo de pruebas unitarias. A continuación un ejemplo del Guard generado:\n\n```\nimport {Injectable} from '@angular/core';\nimport {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';\n\nimport {Observable} from 'rxjs';\n\n@Injectable({\n  providedIn: 'root'\n})\nexport class AuthGuard implements CanActivate {\n  canActivate(\n    next: ActivatedRouteSnapshot,\n    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {\n    return true;\n  }\n}\n```\n\nSi tenemos en cuenta la lógica que esperamos del nuevo Guard creado, podríamos tener algo como el siguiente ejemplo, donde comprobamos que exista una session abierta y en caso contrario, redireccionamos a la ruta de autenticación.\n\n```\nimport {Injectable} from '@angular/core';\nimport {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';\n\nimport {Observable} from 'rxjs';\n\nimport {AuthService} from './auth.service';\n\n@Injectable({\n  providedIn: 'root'\n})\nexport class AuthGuard implements CanActivate {\n  constructor(private auth: AuthService, private router: Router) {\n  }\n\n  canActivate(\n    next: ActivatedRouteSnapshot,\n    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {\n    if (!this.auth.isLogin()) {\n      return this.router.navigate(['/login']).then(() => false);\n    }\n    return true;\n  }\n}\n```\n\n## Utilizando los Guards\n\nPara utilizar un Guard es bien sencillo, basta con ir a la definición de las rutas de la aplicación, y agregar el siguiente código.\n\n```\nconst routes: Routes = [\n  {\n    path: '',\n    canActivate: [AuthGuard],\n    component: AppComponent\n  },\n  {\n    path: 'login',\n    component: LoginComponent\n  }\n];\n```\n\nComo se puede apreciar en el ejemplo anterior, según el tipo de Guard, es en la propiedad en que este debe ser agregado. Y como dije anteriormente, perfectamente pueden ser combinadas más de una acción en un solo Guard, dado que bastaría con implementar dicha acción y luego agregarlo en la ruta.\n\n## Analizando los Guard como servicios\n\nSi miramos más de cerca los Guard, podremos ver que efectivamente, como todos los servicios, estos tienen el decorador *@Injectable*. Esto quiere decir, que los Guard deben agregarse en un Módulo de la aplicación en la sección de *providers*, o si se utiliza con el parámetro `providedIn:'root'` con el que son generados por defecto, esto no es necesario, puesto que significa que este Guard está disponible para toda la aplicación.\n\nPor cuestiones de eficiencia, esta propiedad de ser globales no la recomiendo, puesto que incluso en aquellos módulos en que la aplicación no los utilice, estos van a ser cargados.\n\n## ¿Cómo se ejecutan los Guard en Angular?\n\nEsta es una parte bien importante, que recientemente me tomó varias horas de investigación y rompeduras de cabeza, sobre cómo el Core de Angular trata a estos componentes. Pues resulta que no importa el orden en que se pongan los Guard:\n\n```\nconst routes: Routes = [\n  ...\n  {\n    path: '',\n    canActivate: [FirstGuard, SecondGuard],\n    component: AppComponent\n  },\n  ...\n];\n```\n\nla acción de los Guards siempre es ejecutada, y por tanto, los Guard no son excluyentes, es decir: que el hecho de que el primer Guard se ejecute y retorne falso, no significa que el segundo Guard no va a ser ejecutado.\n\nY te preguntarás ¿y para qué me sirve esto? Pues resulta que en mi experiencia si me importó, porque si por ejemplo, tenemos un Guard que toma datos de la url, o algo semejante para crear o definir una acción que puede incluso excluir al segundo Guard, puede verse completamente destrozado, porque luego llega y se ejecuta el segundo Guard y PUMM, se rompe todo.\n\nLuego de investigar un poco y ver las posibles soluciones para este caso de uso en particular, encontré lo que creo sería la solución al problema, y no es más que crear nuestro Guard intermedio, que ejecutaría a los Guards de la ruta. Este nuevo Guard que se creará, tendrá la responsabilidad de ejecutarlos solo si al ejecutar el anterior, la respuesta fue afirmativa. A continuación un ejemplo de como quedaría este Guard intermedio y de como usarlo si en algún momento chocaras con el mismo problema.\n\n```\n@Injectable({\n  providedIn: 'root'\n})\nexport class IntermediateGuard implements CanActivate {\n\n  constructor(protected injector: Injector) {\n  }\n\n  canActivate(\n    next: ActivatedRouteSnapshot,\n    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {\n\n    let compositeCanActivateObservable: Observable<boolean> = of(true);\n    const routeGuards = next.data.routeGuards;\n\n    if (routeGuards) {\n      for (let i = 0; i < routeGuards.length; i++) {\n        const routeGuard = this.injector.get(routeGuards[i]);\n        compositeCanActivateObservable = compositeCanActivateObservable.pipe(flatMap((bool) => {\n          if (!bool) {\n            return of(false);\n          } else {\n            return routeGuard.canActivate(next, state) as Observable<boolean>;\n          }\n        }));\n      }\n    }\n\n    return compositeCanActivateObservable;\n  }\n}\n```\n\ny para utilizar dicho Guard, la ruta quedaría de la siguiente manera:\n\n```\n{\n  ...\n  path: '',\n  canActivate: [IntermediateGuard],\n  data: { routeGuards: [FirstGuard, SecondGuard] }\n  ...\n}\n```\n\nComo se puede apreciar, en vez de agregar los Guards de la ruta a la propiedad `canActivate`, estos se agregan a los datos de la ruta, para luego ser aplicados por el Guard intermedio.\n\n\n# Conclusiones\n\nEspero te halla sido de utilidad el artículo y aprendieras algo si es la primera vez que lees sobre el tema. Y ya sabes: deja tus comentarios si te ayudó o si simplemente crees que se podría agregar algo más.\n\n> Happy coding!\n",
                  "__typename": "Post"
                },
                "__typename": "PostEntity"
              },
              "__typename": "PostEntityResponse"
            },
            "createdAt": "2022-11-30T23:33:15.000Z",
            "updatedAt": "2022-11-30T23:33:15.000Z",
            "__typename": "Comment"
          },
          {
            "body": "Yo usaba muchísimo los alias hasta que conocí Oh my szh y su plugin para Git.\n\nIgual, para el que no deseé usarlo esto de los alias es buenísimo. Gracias por compartir",
            "email": null,
            "name": null,
            "user": {
              "data": {
                "id": "123",
                "attributes": {
                  "username": "ragnarok22",
                  "avatarUrl": "https://avatars.githubusercontent.com/u/8838803?v=4",
                  "__typename": "UsersPermissionsUser"
                },
                "__typename": "UsersPermissionsUserEntity"
              },
              "__typename": "UsersPermissionsUserEntityResponse"
            },
            "post": {
              "data": {
                "id": "134",
                "attributes": {
                  "title": "Mostrando mi configuración local de Git",
                  "name": "mostrando-mi-configuracion-local-de-gitdyzjt",
                  "body": "Luego de algunos años utilizando git he llegado a definir algunas configuraciones las cuales me permiten ser más productivo en mi día a día. Es por esto que pretendo compartirlas en el presente artículo para quien pueda interesar.\n\n## ¿Qué es un alias?\n\nAntes de mostrar mis alias se hace necesario explicar que son. Un alias no es más que un shortcut que se crea para hacernos la vida más fácil.\n\nImaginemos que cada vez que creamos una rama nueva en nuestro repositorio hay que ejecutar el siguiente comando:\n\n```\ngit checkout -b new-branch-name\n```\n\nSi el comando anterior es una acción que constantemente ejecutamos y no deseamos en cada momento escribir o recordar todo el comando, aquí podemos utilizar un alias. El alias en cuestión resumiría `checkout -b` en algo más sencillo como `chn` y el nuevo comando que se ejecutaría sería algo como lo siguiente:\n\n```\ngit chn new-branch-name\n```\n\nPuede parecer tonto, pero muchas veces es de mucha ayuda y mejora en gran medida nuestra productividad con git (como es mi caso).\n\n> NOTA: entiendo que muchos no utilicen git desde el terminal, pero les aliento a que lo hagan dado que siempre es bueno entender cómo funcionan a bajo nivel las herramientas que utilizamos.\n\n## Mi configuración\n\n```\n[pull]\n\trebase = true\n[user]\n\temail = guille@mi.cu\n\tname = Guillermo\n[core]\n\tautocrlf = input\n[alias]\n\tch = checkout\n\tchn = checkout -b\n\tme = merge\n\tfe = fetch -p\n\tpu = pull -p\n\ttree = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all\n\ttr = !git --no-pager log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all -n 10\n```\n\n- `rebase = true`: Define que al ejecutar `git pull` y existen nuevos commit en la rama actual, la operación por defecto para integrar los cambios remotos y los locales será un rebase.\n- `ch = checkout`: alias para seleccionar una rama.\n- `chn = checkout -b`: alias para crear una nueva rama.\n- `me = merge`: alias para ejecutar merge.\n- `fe = fetch -p`: alias para ejecutar fetch y descargar todos los cambios remotos que no estén locales.\n- `pu = pull -p`: alias para ejecutar pull en la rama actual.\n- `tree = log --graph ...`: alias para mostrar en el terminal el árbol de git de manera limpia y formateada.\n- `tr = !git --no-pager ...`: alias para mostrar en el terminal el árbol anterior pero solo con los últimos 10 commits.\n\n## Conclusiones\n\nPara muchas personas esto puede parecer un pseudo-lenguaje que me invento en el que solo yo y nadie más sabe qué hacer. Pues no están muy alejados de la realidad, es algo parecido a ello, pero al final cada cual utiliza aquello que le hace la vida más fácil y que te hace más productivo. Si esta configuración de *git* te ayuda tanto como a mi, pues siéntete libre de utilizarlo e integrarlo en tu vida productiva.\n\n> Happy coding!!!\n",
                  "__typename": "Post"
                },
                "__typename": "PostEntity"
              },
              "__typename": "PostEntityResponse"
            },
            "createdAt": "2022-11-04T11:36:04.000Z",
            "updatedAt": "2022-11-04T11:36:04.000Z",
            "__typename": "Comment"
          },
          {
            "body": "Excelente artículo, me permitió integrar GA de una forma más elegante y funcional.",
            "email": null,
            "name": null,
            "user": {
              "data": {
                "id": "177",
                "attributes": {
                  "username": "marturojt",
                  "avatarUrl": "https://avatars.githubusercontent.com/u/3209233?v=4",
                  "__typename": "UsersPermissionsUser"
                },
                "__typename": "UsersPermissionsUserEntity"
              },
              "__typename": "UsersPermissionsUserEntityResponse"
            },
            "post": {
              "data": {
                "id": "72",
                "attributes": {
                  "title": "Integrar tu aplicación Angular con Google Analytics",
                  "name": "integrar-tu-aplicacion-angular-con-google-analytics",
                  "body": "Recientemente publiqué un artículo sobre cómo [integrar React con Google Analytics](https://binary-coffee.dev/post/integrando-react-con-google-analytics) (GA), y resulta que siendo Angular una de las tecnologías que más utilizo en mi vida cotidiana, no había hecho el homólogo de integrar Angular con GA.\n\nPues cómo lo dije antes, no es objetivo de este artículo, decir porque es o no una buena opción utilizar GA, ni comparar esta herramientas con muchas otras opciones que hay actualmente. Solo pretendo de manera muy sencilla y práctica, que puedas integrar tu aplicación en Angular con GA.\n\n\n## Integrar Google Analytics en la aplicación Angular\n\nPara integrar Angular con GA, no haré uso de ninguna dependencia externa o cosas semejantes. Solo por medio de lo que brinda por defecto un proyecto de Angular, vas a ser capaz de integrarlo.\n\nPrimeramente necesitas crear tu cuenta en GA y adicionar tu aplicación. Esto es muy sencillo de hacer una vez que entras en GA, así que no me voy a enfocar en ese aspecto, sino en la integración en sí. Una vez que has agregado el dominio de tu sitio web a GA, solo necesitas el identificador que te brindan y con el cual procederemos con la integración.\n\n![GA-identifier](https://api.binary-coffee.dev/uploads/google_analytics_id_5b3ce54f89.jpeg)\n\nPrimeramente definiremos las variables necesarias en la configuración del proyecto. Con las variables es posible facilitar en lo posterior, los diferentes entornos de despliegue (producción, desarrollo, etc) que pueda tener el proyecto. A continuación un ejemplo de cómo puede quedar el archivo de configuraciones:\n\n*src/environments/environment.ts*\n```\nexport const environment = {\n  production: false,\n  googleAnalyticsId: ''\n}\n```\n\nA continuación, es necesario agregar al proyecto, el script de integración que GA brinda. Esto se logra, agregando el script al fichero index.html del proyecto.\n\n*src/index.html*\n```\n<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>New App</title>\n  ...\n\n  <!-- Global site tag (gtag.js) - Google Analytics -->\n  <script async\n          src=\"https://www.googletagmanager.com/gtag/js\"></script>\n  <script>\n    window.dataLayer = window.dataLayer || [];\n    function gtag() {\n      dataLayer.push(arguments);\n    }\n    gtag('js', new Date());\n  </script>\n\n  ...\n</head>\n<body>\n  <app-root></app-root>\n</body>\n</html>\n```\n\nCompletados los pasos anteriores, solo queda integrar GA al sistema de rutas de Angular. Para lograr esto, hay que suscribirse a los eventos que se originan de las rutas y en cada cambio de ruta, enviar a GA la respectiva notificación.\n\n*src/app/app.component.ts*\n```\nimport {Component} from '@angular/core';\nimport {NavigationEnd, Router} from '@angular/router';\n\nimport {environment} from '../environments/environment';\n\ndeclare let gtag: (property: string, value: any, configs: any) => {};\n\n@Component({\n  selector: 'app-root',\n  templateUrl: './app.component.html',\n  styleUrls: ['./app.component.scss']\n})\nexport class AppComponent {\n  constructor(public router: Router) {\n    this.router.events.subscribe(event => {\n      if (event instanceof NavigationEnd) {\n        gtag('config', environment.googleAnalyticsId, {\n          page_path: event.urlAfterRedirects\n        });\n      }\n    });\n  }\n}\n```\n\n## Conclusiones\n\nEspero que con estos sencillos pasos, hayas sido capaz de integrar tu aplicación y ya estés utilizando los inmensos beneficios que brinda Google Analytics. Un ejemplo práctico de integración de GA con Angular, es el proyecto [Binary Coffee](https://github.com/dcs-community/dcs-frontend) en cuestión, así que puedes llegarte por su código fuente y mirar cómo lo antes vistos está puesto en práctica.\n\n> Happy coding!",
                  "__typename": "Post"
                },
                "__typename": "PostEntity"
              },
              "__typename": "PostEntityResponse"
            },
            "createdAt": "2022-09-19T01:48:46.000Z",
            "updatedAt": "2022-09-19T01:48:46.000Z",
            "__typename": "Comment"
          },
          {
            "body": "Interesante",
            "email": null,
            "name": null,
            "user": {
              "data": {
                "id": "17",
                "attributes": {
                  "username": "eduinlight",
                  "avatarUrl": "https://avatars2.githubusercontent.com/u/32907001?v=4",
                  "__typename": "UsersPermissionsUser"
                },
                "__typename": "UsersPermissionsUserEntity"
              },
              "__typename": "UsersPermissionsUserEntityResponse"
            },
            "post": {
              "data": {
                "id": "138",
                "attributes": {
                  "title": "Mi experiencia con microfrontend y single-spa",
                  "name": "mi-experiencia-con-microfrontend-y-single-spardccc",
                  "body": "**Microfrontend** es un concepto relativamente nuevo en el que se trata de incorporar **la arquitectura de microservicios** al frontend, o algo parecido. La idea es tener una serie de aplicaciones independientes, distintos repos, que puedan coexistir en una SPA controladas por una aplicación \"root\".\n\n\nEn esta aplicación root, creada mediante librerías como [Single-SPA](https://web.archive.org/web/20210221230901/https://single-spa.js.org/) por poner un ejemplo, es donde vamos a importar todas las partes que conformarán nuestra web final. También definiremos el manejo de rutas, estilos globales, layout, entre otras cosas.\n\n\nLlevando lo anterior a un ejemplo, imagina una web clásica con header, main, footer y algún aside. Esta página podríamos dividirla en varias aplicaciones pequeñas que pueden convivir independientemente. Incluso crearlas con diferentes tecnologías: React, Angular, Vue, Svelte.\n\n![](https://web.archive.org/web/20210221230901im_/https://i.stack.imgur.com/N1NmR.gif)\n\nEl ejemplo anterior no es el más claro sobre cuando usar este paradigma, sino que cada quien puede elegirlo o no. Por lo general las webs monolíticas crecen demasiado, y en ocasiones se vuelve un problema tanto para nuevos integrantes en el team como para la escalabilidad.\n\n## Un poco de Single-SPA\n\nSí, su nombre es un poco redundante, hasta ellos lo admiten ?. Como algo reciente, los aportes de la comunidad son pocos, pero están compensados con una excelente documentación. Ahora vamos a crear un pequeño proyecto de ejemplo.\n\n\nCreamos el root, una vez creado ejecutamos `start` y navegamos hasta `http://localhost:9000/`.\n\n```\nnpx create-single-spa --moduleType root-config\nnpx start\n```\nAhora creamos nuestras aplicaciones, durante la creación de cada app vamos a poder elegir el framework con el que queremos trabajar. Luego levantamos la app con `start`.\n\n```\nnpx create-single-spa --moduleType app-parcel\nnpx start\n```\nUna vez hecho esto debemos cambiar en nuestro root de single-spa el archivo index.ejs, para importar nuestra aplicación, podemos simplemente cambiar el que viene por defecto **@single-spa/welcome**.\n\n\n? Una vez hecho esto tendrás el resultado corriendo en tu navegador.\n\n\n## Beneficios de microfrontend\n* Mejoras incrementales.\n* Bases de código simples y desacopladas.\n* Despliegue independiente.\n* Equipos autónomos.\n* Enfoques de integración.\n* Tu equipo puede usar los frameworks que deseen.\n\nCada día esta práctica va tomando fuerza. Hasta el punto que existen grandes compañías usándola como por ejemplo Namecheap y Atlassian. Su poder es tremendo y básicamente te permite unir varias apps en una plataforma SaaS. Te recomiendo que le des una ojeada.\n\n\n[? Documentación](https://web.archive.org/web/20210221230901/https://single-spa.js.org/)",
                  "__typename": "Post"
                },
                "__typename": "PostEntity"
              },
              "__typename": "PostEntityResponse"
            },
            "createdAt": "2022-06-20T14:39:01.000Z",
            "updatedAt": "2022-06-20T14:39:01.000Z",
            "__typename": "Comment"
          }
        ]
      }
    };
    const expected = {};
    expect(interceptor.formatResponseObjects(example)).toEqual(expected);
  });
});
