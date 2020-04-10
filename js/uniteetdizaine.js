class Speaker
{
   constructor(param)
   {
      this.synth = window.speechSynthesis; 

      this.speaker = new SpeechSynthesisUtterance();
      this.speaker.pitch = param.pitch;
      this.speaker.rate = param.rate;
      this.speaker.voice = this.synth.getVoices()[param.voice];
   }

   speak(text)
   {
      if(!this.synth.speaking && !this.synth.pending)
      {
         this.speaker.text = text;
         this.synth.speak(this.speaker);
      }
   }
}


class Game 
{
   constructor()
   {
      this.nombre;   

      this.is_schemap;

      this.solution;

      this.response = 0;

      this.win = false;

      this.speaker = new Speaker({
         pitch: 1,
         rate: 0.8,
         voice: 0,
      });

      this.run();
   }

   random_number_range(a, b)
   {
      const range = b - a;

      return a + Math.round((Math.random()*range));
   }

   edit_response(nombre)
   {
      if(!this.win)
      {
         if(nombre < 0)
         {
            this.response -= Math.abs(nombre); 
         }
         else
         {
            this.response += nombre; 
         }
   
         if(this.response > 100)
         {
            this.response = 100
         }
   
         if(this.response < 0)
         {
            this.response = 0
         }
   
         this.update();
      }
   }

   run()
   {
      this.win = false;
      this.response = 0;

      this.nombre = this.random_number_range(1, 100);

      this.is_schemap = this.random_number_range(0 , 1);

      this.update();
   }
   
   check_response()
   {
      if(!this.win)
      {
         if(this.response === this.nombre)
         {
            this.speaker.speak('Bravo '+this.nombre+' est la bonne réponse');
            this.win = true;
            setTimeout(() => this.run(), 5000);
         }
         else
         {
            this.speaker.speak('Dommage ce n\'est pas la bonne réponse');
         }
      }
   }

   update()
   {
      if(this.is_schemap === 1)
      {
         this.update_schemap(this.nombre);
         this.update_nombre(this.response);
      }
      else
      {
         this.update_schemap(this.response);
         this.update_nombre(this.nombre);
      }
   }

   update_nombre(nombre)
   {
      document.querySelector('.affichage_nombre').innerText = nombre;
   }

   update_schemap(nombre)
   {
      let dixaines = Math.floor(nombre/10);
      let unites = nombre - (dixaines * 10);

      let ctn_dix = document.querySelector('.container_dixaines');
      let ctn_uni = document.querySelector('.container_unites');

      ctn_dix.innerHTML = '';
      ctn_uni.innerHTML = '';

      for(let i = 0; i < unites; i++)
      {
         let unite = document.createElement('div')
         let uTop = document.createElement('div')
         let uLeft = document.createElement('div')
         let uRight = document.createElement('div')
         unite.classList.add('unite')

         let topContent = document.createTextNode("1")
         unite.appendChild(uTop)
         unite.appendChild(uLeft)
         unite.appendChild(uRight)
         uTop.appendChild(topContent)
         uTop.classList.add('side', 'top', 'uTop')
         uLeft.classList.add('side', 'left', 'uLeft')
         uRight.classList.add('side', 'right', 'uRight')

         ctn_uni.appendChild(unite);

      }

      for(let i = 0; i < dixaines; i++)
      {
         let dixaine = document.createElement('div')
         let dTop = document.createElement('div')
         let dLeft = document.createElement('div')
         let dRight = document.createElement('div')
         dixaine.classList.add('dixaine');

         let leftContent = document.createTextNode("1")
         let rightContent = document.createTextNode("0")
         dixaine.appendChild(dTop)
         dixaine.appendChild(dLeft)
         dixaine.appendChild(dRight)
         dLeft.appendChild(leftContent)
         dRight.appendChild(rightContent)
         dTop.classList.add('side', 'top', 'dTop')
         dLeft.classList.add('side', 'left', 'dLeft')
         dRight.classList.add('side', 'right', 'dRight')



         ctn_dix.appendChild(dixaine);
      }
   }
}

const game = new Game();