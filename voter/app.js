const app = Vue.createApp({
  // Optionen
  data: function () {
    return {
      submissions: submissions, // kommt aus seed.js,
      // totalVotes: 0,
    };
  },

  // - wird ausgeführt wenn sich abhängige Daten ändern
  // - verwendet man wenn Daten von anderen abhängen (z.B totalVotes)
  computed: {
    totalVotes() {
      return this.submissions.reduce((totalVotes, submission) => {
        return totalVotes + submission.votes;
      }, 0);
    },

    sortedSubmissions() {
      return this.submissions.sort((a, b) => {
        return b.votes - a.votes;
      });
    },

    cardHeaderBackgroundColor() {
      return {
        "bg-primary": this.totalVotes >= 50,
        "text-white": this.totalVotes >= 50,
      };
    },

    cardTitleFontSize() {
      return {
        //fontSize: this.totalVotes / 2 + "px",
      };
    },
  },

  // - wird ausgeführt wenn sich "sichtabre" Daten ändern (wenn das Template neu gerendert werden muss)
  // - verwendet man für Daten die sich permanent ändern (z.B Event-Listener (click))
  methods: {
    //upvote: function() {}
    // upvote(submissionId) {
    //   const submission = this.submissions.find(
    //     (submission) => submission.id === submissionId
    //   );
    //   submission.votes++;

    /*console.log(info);
      console.log(event);*/
    /*totalVotes() {
      return this.submissions.reduce((totalVotes, submission) => {
        return totalVotes + submission.votes;
      }, 0);
    },*/

    addNewSubmission() {
      const submissionInput = document.querySelectorAll(
        "#newSubmissionInput input"
      );
      const title = submissionInput[0].value;
      const desc = submissionInput[1].value;
      const author = submissionInput[2].value;
      const newId = this.submissions.length + 1;

      if (!title || !desc || !author) {
        alert("Darf nicht leer sein!");
        return;
      }

      this.submissions.push({
        id: newId,
        title: title,
        desc: desc,
        votes: 0,
        author: author,
        img: "https://placehold.co/64",
      });
    },
  },

  // wird ausgeführt wenn sich die beobatchteten Daten ändern
  // verwendet man für z.B localStorage, HTTP-Requests etc (was sich nicht direkt auf das Template auswirkt)
  watch: {
    /*submissions(newValue, oldValue) {
      console.log(newValue);
      console.log(oldValue);
    },*/
    // submissions: {
    //   handler(newValue, oldValue) {
    //     /*console.log(newValue);
    //     console.log(oldValue);*/
    //     this.totalVotes = this.submissions.reduce((totalVotes, submission) => {
    //       return totalVotes + submission.votes;
    //     }, 0);
    //   },
    //   deep: true, // benötigt man für komplexere Datentypen wie z.B Array
    //   immediate: true, // der Watcher wird initial (nach Erstellung der Componet) ausgeführt (somit ist totalVotes nicht mehr 0)
    // },
    // // funktioniert so, bei primitiven Datentypen (Number, String, Boolean, etc.)
    // totalVotes(newValue, oldValue) {
    //   /*console.log(newValue);
    //   console.log(oldValue);
    //   */
    // },
  },
});

// Globale Component
app.component("SubmissionListItem", {
  // Optionen
  props: ["submission"],
  methods: {
    /*upvote(submissionId) {
      const submission = this.submissions.find(
        (submission) => submission.id === submissionId
      );
      submission.votes++;
    },*/

    // nicht ideal, da hier Daten vom Eltern-Component verändert werden.
    // funktioniert aber in diesem Fall weil es ein Array-Pointer ist
    upvote() {
      this.submission.votes++;
    },
  },
  template: `<div class="d-flex">
              <div class="d-shrink-0">
                <img
                  style="width: 100px"
                  v-bind:src="submission.img"
                  alt=""
                /><!--binde das src-attribut an die Daten.-->
              </div>
              <div class="flex-grow-1 ms-3">
                <!--h5 v-once--><!--wird nur einmalig gerendert. Daten können aber trotzdem noch geändert werden.-->
                <h5>
                  {{ submission.title }}
                  <!-- Click-Event mittel v-on:click. $event speichert das Event ab, wenn man auch noch zusätzliche Parameter mitgeben möchte-->
                  <span
                    class="float-end text-primary"
                    style="cursor: pointer;user-select: none;"
                    v-on:click="upvote(submission.id)"
                    ><i>▲</i>
                    <strong> {{ submission.votes }}</strong></span
                  >
                </h5>
                <!--div>{{ submissions[0].desc }}</div-->
                <!--V-HTML-Directive um HTML-Code in den Daten zu interpretieren-->
                <div v-html="submission.desc"></div>
                <!--V-Pre-Directive um den tatsächlichen Text (ohne Interpolation) anzuzeigen-->
                <!--div v-pre>{{ submissions[0].author }}</div-->

                <!-- iteriere durch ein Object-->
                <!--ul>
                  <li v-for="(value, key, index) in submission">
                    {{index}} - {{ key }} - {{ value }}
                  </li>
                </ul-->
                <small class="text-muted"
                  >Eingereicht von: {{ submission.author }}</small
                >
              </div>
            </div>
          `,
});

// Liefert die Instanz zur Root-Component zurück
const vm = app.mount("#app");
