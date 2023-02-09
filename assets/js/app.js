//Esta aplicación consume una API de Github y nos trae los datos del usaurio que mandemos dentro del username. 
//Una vez que se obtiene la información del API se muestra la información en el DOM.

const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;

/*Los nombres de las variables deben ser significativos y dar contexto de la información almacenada.
Esto mejorará la legibikidad y mantenibilidad del código.
//Es buena práctica colocar un $ delante de las variables y constantes que hacen referencia a elementos HTML,
para diferenciarlos del resto.
//Cuando se utiliza el querySelector se debe hacer referncia a una clase, usando un punto delkante del nombre de la clase.
*/

const $name = document.querySelector('.name');
const $blog = document.querySelector('.blog');
const $location = document.querySelector('.location');

//Cuando utilizamos await, la función debe ser asíncrona. 
async function displayUser(username) {
//Actualizamos al nuevo nombre de la variable, que pasó de "n" a "name". 
  $name.textContent = 'cargando...';
/* Es buena práctica colocar el código que es propenso a fallos, dentro de un bloque try catch, ya que si la API
no está disponible o hay problemas de conectividad, nuestra aplicación estará preparada para tolerar esos fallos.
*/  
try{
      const response = await fetch(`${usersEndpoint}/${username}`);
//Una vez que obtengamos la respuesta, necesitamos parsearla a JSON para trabajar con ella.
//Esto nos devolverá una promesa, por lo cual debemos colocar un await para esperar el callback con la respuesta. 
      const data = await response.json();
//Se cambian los nombres de variables a los nuevos, que son más descriptivos.
//Lo que queremos imprimir son variables,por ello, debemos elimianr las comillas
      $name.textContent = data.name;
      $blog.textContent = data.blog;
      $location.textContent = data.location;
  } catch (error) {
 throw new Error ('Error al consumir API');
  }

}

function handleError(err) {
  console.log('OH NO!');
  console.log(err);
//Se actualiza nombre de la variable.
  $name.textContent = `Algo salió mal: ${err}`
}

displayUser('stolinski').catch(handleError);

/*Si todo está bien, todo correcto, deben aparecer los siguientes tres datos: 
Scott Tolinski

http://scotttolinski.com

Denver, CO
*/