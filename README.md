# Hostel (HostElement)

## brief
An application that can host other applications as Angular Elements and provide them some services. Some of the applications can be a tab, but also as panel, top-bar, mission manager (my-desktop) and so on.

## Web Component

>Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps. [docs](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

In simple words, web component is the abbility to compile every component from every framework into a js file, and use these components in any other application. By simply importing the js file, and use the pre-defined tag of the component.

### Angular Element
It's a library of angular that take an NgModule and compile it into a web component. If the module is AppModule (the root module of the application) - the whole application becomes a web component! 

Before the explanation of 'How to do it', some background, feel free to skip.

#### bootstrap
Bootstrap is the entry point of our application, we know about two places in our application we've seen this function.
	 
* main.ts  
```js
platformBrowserDynamic()
 -> .bootstrapModule(AppModule)
 	.catch(err => console.error(err));
```  
This method is a method of PlatformRef (that returns from platformBrowserDynamic()) that indicates to the platform (in our case - the browser) that AppModule is the entry point to our application - the root component (\<app-root> which exist in index.html) is declared in that module.
* app.module.ts
```js
@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule],
	providers: [],
 ->	bootstrap: [AppComponent]
})
export class AppModule { }
```
the boostrapModule() read the components in the bootsrap array, and call to `appRef.Bootstrap(AppComponent)`. now, after AppComponent is bootsraped, the browser know what to do when he see \<app-root> and our application can run.

#### Dependency Injection
This issue is complicated, all I know it's the basics use cases, but we can do a lot of usefull things with that mechanism. Some points about it.
* It's everywhere  
	every component, module, directive, service, application. platform (let's call them angular entities :-)) have an injected injector that we can use if we inject it into the constructor.  `constructor(private injector: Injector) { }`

* It's hirarchical  
	actually, the injector is not the same one for all angular entities. every instance of an entity has it's own injector. but the DI mechanism is hirarchical - means, if a component want to use some service, the DI check if it's own injector have that service, if not it checks in the parent injector etc. until the root component (or the platform!).

* It's accssesible  
	The main usage we do with the DI is to inject services (we can inject almost everything!). When we create a service, we set the property `providedIn` that means the level of the injector in the hirarchy that the service will be available at.   
		1. `'any'` - the service will be available in any injector - means that it's not singleton! every injector will create new instance of the service.  
		2. `'root'` - the most common option. The service will be available in the injector of the root component, which means that every component will get the instance created in the root injector, so 2 components that under the same root will use the same instance of that service (singleton)  
		3. `'platform'` - since angular 9. remember the main.ts file?  
	```js
	 -> platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => console.error(err));
	```
	this function create an PlatformRef, which have it own injector, higher then the root injector. But why we need an injector of component that not exist in our component tree - not under our root component? becuase there are components that we use them in our application, that they are root components by themselves - web components! (or angular elements)

### How to do it (with long explanations - summary is later)
so after all this bullshit, lets make some angular elements  
first we need to install two libraries  :

1. `ng add @angular/elements`  
	contains the function that compile our angular component to web component
2. `ng add ngx-build-plus`   
	this library interfere in the build process of angular, and give us some extra options to control it. we use it for merge our js's to one file, to add polyfill, and to define global variables for our imported libraries (explained later)

now we need to edit our application, let's say that we want to compile our AppComponent into web component. we need to prevent from angular to bootstrap this component. 

in module.app.ts
1. remove AppComponent from the bootstrap array (usually the array sould be empty, if there is another component there, it's mean that there is another root component in the app and it should be web component two)

2. add this code to the class AppModule
```js
export class AppModule implements DoBootstrap {
	constructor(private injector: Injector) { }

	ngDoBootstrap(appRef: ApplicationRef) {
	if (environment.production) {
		const element = createCustomElement(AppComponent, { injector: this.injector }) as any;
		customElements.define('elm-bullshit-root', element);
		return;
	}

	appRef.bootstrap(AppComponent);
}
```
we implements the interface `DoBootstrap` that have only one function `ngDoBootstrap` (like any other lifecycle hooks of angular). this function is called when bootstrapModule() is called in main.ts and the bootstrap array is empty. that's how we manualy bootstrapping our application. 

In order to keep our development simple, we define our web component only in production mode, in development mode we continue as usual (by manualy bootstrapping our root component - the same result as inserting the component in the bootstrap array).

and where the magic happens!

```js
const element = createCustomElement(AppComponent, { injector: this.injector }) as any;
```

createCustomElement is function from @angular/elements that takes the component, and the injector (for providing every thing that the component and it children might need)
and returns an element (sort of HTMLElement, there is a little issue with the type here, so we need to cast it to any)  
element is our new born web component, we need to give him a name and tell the world!

```js
customElements.define('elm-bullshit-root', element);
```
`customElement` is **not** a function of angular, is a function of the browser (comes from lib.dom.ts). this function is managing a registry for the web components, so when the DOM see `<elm-bullshit-root>` (temp name) it know to put there the element `element` that we just created.

we need to build and we done! for that, we first run  
`ng g ngx-build-plus:externals`  
add an extra webpack configuration so if there are many angular elements, they all use the same libraries and not every element will import its own (prevent duplications)

now we build - not with ng build but with ngx-build-plus  
`npm run ngx-build-plus:externals`  

when it's done we will have 3 files  
	1. `scripts.js` - contain all the angular framework   
	2. `polyfill.js` - contain scripts for adapting to older browsers (IE)  
	3. `main.js` - our bundle

we need to import all these files in order to use our web component, but notice - if we have more then one angular element we need to import `scripts.js` and `polyfill.js` only once! and `main.js` for every web component (or compile them together).

in dist/\<projectName>/ there is an index.html that contains

```html
<body>
<elm-bullshit-root></elm-bullshit-root>
	<script src="polyfills-es5.js" nomodule defer></script>
	<script src="polyfills-es2015.js" type="module"></script>
	<script src="polyfill-webcomp-es5.js" defer></script>
	<script src="polyfill-webcomp.js" defer></script>
	<script src="scripts.js" defer></script>
	<script src="main-es2015.js" type="module"></script>
	<script src="main-es5.js" nomodule defer></script>
</body>
```

here i have every file twice, one for es5 and one for es2015, but if we don't care about Explorer we can use only the es2015. 
so my point is, if we import these files, we can use the tag \<elm-bullshit-root> as known html element!



### Summary
* `ng add @angular/elements`
* `ng add ngx-build-plus`
* `ng g ngx-build-plus:externals`
* `ng g ngx-build-plus:wc-polyfills`
* remove AppComponet from bootstrap array in AppModule
* implements `ngDoBootstrap` in AppModule
* create an element using `const elm = createCustomElement(AppComponent, { injector })`
* define the element using `customElement.define('custom-element, elm)`
* build using `npm run ngx-build-plus:externals`
* coping the js files from dist/*.js to your application (in asstets for example)
* add `<script src="assets/*.js">` for each js file
* use your \<custom-element>\</custom-element>!
