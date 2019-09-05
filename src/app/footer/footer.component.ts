import { Directive, HostBinding, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//directivas que importaremos para que los enlaces externos que agregamos en links "href" (como en los iconos de facebook, etc)
//no inspeccionen nuestra pagina por medio de "window.opener" Lo realizaremos con Angular directives
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  /***************************************************Botón para subir********************************************************/
  constructor(){}
  
  ngOnInit() {
  }


}
//A partir de aqui, exportaremos toda la configuracion para desplegar enlaces externos de forma segura para nuestra aplicacion//

@Directive({          //su uso aqui solo para denotar a donde es que se implementaran los cambios
  selector: 'a[href]',
})                    //
export class ExternalLinkDirective {

  @HostBinding('attr.rel') relAttr = '';        //Con @HostBinding accedemos a los atributos de un elemento,
  @HostBinding('attr.target') targetAttr = '';  //en este caso, estamos accediendo a los atributos del elemento "a";
  @HostBinding('attr.href') hrefAttr = '';      //los cuales son: rel, target y href.
  @Input() href: string;                        /** Con @input obtenemos el valor de href en cada enlace **/
                                                /** De esta forma, cada vez que el valor de href cambie, ngOnChanges **/
                                                /** se encargará de comprobar nuevamente el valor de href **/

  constructor(@Inject(PLATFORM_ID) private platformId: string) { }  //constructor adaptado para implementar los cambios en nuestro (a[href])

  ngOnChanges() {
    this.hrefAttr = this.href;           //cada vez que hayan cambios, 
  
    if (this.isLinkExternal()) {              //si el enlace es externo, establecemos los atributos "rel" y "target"
      this.relAttr = 'noopener';              //Ahora los enlaces que se despliegan en una nueva pestaña son seguros
      this.targetAttr = '_blank';
    }
  }

  private isLinkExternal() {           //inyectaremos el platform.Id para verificar si ejecutamos dicho link en el servidor
    return isPlatformBrowser(this.platformId) && !this.href.includes(location.hostname);
  }
}
