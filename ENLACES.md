# Enlaces de las propuestas por cliente

**No se publica**: está en `.vercelignore`. En un sitio estático todo lo que
se sube se sirve, así que este archivo no puede vivir desplegado.

| Cliente | Enlace |
|---|---|
| Supermú | https://www.purlyconcept.com/p/supermu-w46q94vjh9 |
| Euro | https://www.purlyconcept.com/p/euro-fzscfvx9c8 |
| Maxiofertas | https://www.purlyconcept.com/p/maxiofertas-msa9zdhu74 |

El nombre va delante para identificarlos sin abrirlos; **lo que protege es el
código**, no el nombre. Quien tenga el de Euro sabe que el patrón es
`/p/<cliente>-<código>`, y aun así no puede llegar al de Maxiofertas: tendría
que adivinar diez caracteres.

Los códigos no llevan `0`, `O`, `1`, `l` ni `I`, por si hay que dictar uno.

Las páginas llevan `noindex`, así que no salen en buscadores. Y `/supermu`,
`/euro` y `/maxiofertas` redirigen a la portada: un enlace viejo no muere en
404 ni enseña nada.

⚠️ Esto es **discreción, no seguridad**: quien tenga el enlace entra y lo
puede reenviar. Sirve para que un cliente no llegue al de otro probando la
URL, y para nada más.
