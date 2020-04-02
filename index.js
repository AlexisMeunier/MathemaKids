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
      this.nombre1;   
      this.nombre2;

      this.operateur;

      this.calcule;

      this.result;

      this.solution;

      this.response = '';

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

   run()
   {
      if(!this.speaker.synth.speaking && !this.speaker.synth.pending)
      {
         this.win = false;
         this.reset_response();

         this.nombre1 = this.random_number_range(0, 10);
         this.nombre2 = this.random_number_range(0, 10);

         this.operateur = this.random_number_range(0 , 1);

         if(this.operateur === 1)
         {
            this.calcule = this.nombre1 + 'plusse' + this.nombre2;
            this.result = this.nombre1 + this.nombre2;
         }
         else
         {
            this.calcule = this.nombre1 + 'moins' + this.nombre2;
            this.result = this.nombre1 - this.nombre2;
         }

         if(this.result < 0)
         {
            this.run();
         }
         else
         {
            this.speaker.speak(this.calcule);
            this.solution = this.nombre1 + ((this.operateur === 1 ) ? '+' : '-') + this.nombre2 + '=' + this.result;
         }
      }
   }

   repeat()
   {
      if(!this.win)
      {
         this.speaker.speak(this.calcule);
      }
   }

   check_response()
   {
      if(this.response === this.solution)
      {
         this.speaker.speak('Bravo, '+ this.solution);
         this.win = true;
      }
      else if( this.response.length === this.solution.length)
      {
         this.speaker.speak('Ce n\'est pas la bonne réponse tu peux cliquer sur effacer et recommencer');
      }
   }

   refresh_input()
   {
      document.querySelector('#response').value = this.response;
   }

   add_to_response(text)
   {
      if(!this.win)
      {
         this.response += text;
         this.check_response();
         this.refresh_input();
      }
   }

   reset_response()
   {
      if(!this.win)
      {
         this.response = '';
         this.refresh_input();
      }
   }
}

const game = new Game();
