# Propuestas por cliente — enlaces y cómo se publican

**Este archivo no se publica**: está en `.vercelignore`. En un sitio estático
todo lo que se sube se sirve, así que el mapa de enlaces no puede vivir
desplegado.

## Los enlaces

| Cliente | Enlace | Qué tiene |
|---|---|---|
| **Supermú** | https://www.purlyconcept.com/supermu-w46q94vjh9 | 11 capítulos · con el plan comercial |
| **Euro** | https://www.purlyconcept.com/euro-fzscfvx9c8 | 8 capítulos |
| **Maxiofertas** | https://www.purlyconcept.com/maxiofertas-msa9zdhu74 | 8 capítulos · solo caja de 1 par |

## La configuración, para las próximas

Esta es la forma. Una propuesta nueva se publica igual:

1. **El archivo va en la raíz**, con el nombre `<cliente>-<código>.html`.
   El código son **diez caracteres** al azar.
   ⚠️ El nombre es para reconocerlo sin abrirlo; **lo que protege es el
   código**. Quien tenga el de un cliente deduce el patrón y aun así tendría
   que adivinar diez caracteres para llegar al de otro.
2. **El alfabeto del código no lleva `0`, `O`, `1`, `l` ni `I`**, por si hay
   que dictarlo por teléfono.
3. **`<meta name="robots" content="noindex, nofollow">`** en el `<head>`. Es
   la otra mitad: sin eso la página sale en Google y el código no sirve de
   nada.
4. **La dirección corta redirige a la portada** (`/<cliente>` → `/` en
   `vercel.json`). Así un enlace viejo no muere en 404 ni enseña nada.
5. **Las rutas de imagen van absolutas** (`/clientes/...`, `/pkg-gold.png`).
6. **Se anota aquí.**

⚠️ Esto es **discreción, no seguridad**: quien tenga el enlace entra y lo
puede reenviar. Sirve para que un cliente no llegue al de otro probando la
URL, y para nada más. Si alguna vez hace falta de verdad, eso es contraseña.

## Antes de publicar

- ⚠️⚠️ **Mirarla a 390 px, no solo en el computador.** Estos decks se mandan
  por WhatsApp y se abren en el teléfono. El 26-nov se publicó una en la que
  **«SMS» no aparecía**: la rejilla de columnas estaba en **estilo en línea**,
  y a un estilo en línea no lo alcanza ninguna media query.
  **Toda rejilla de columnas va en CLASE**, con su regla en
  `@media (max-width: 768px)`.
- **Los precios salen del CRM** (tabla `skus`), no de otra página. Un precio
  por material y presentación, sin promedios.
- **Las fotos de tienda son del cliente que sale en ellas.** Las de Supermú
  muestran su punto de pago, con uniformes y logo: no pueden ir en la
  propuesta de otra cadena.
