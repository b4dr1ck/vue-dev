const app = Vue.createApp({
  // Optionen
  data: function () {
    return {
      submissions: submissions, // kommt aus seed.js
    };
  },
  methods: {
    //upvote: function() {}
    upvote(info, event) {
      this.submissions[0].votes++;
      console.log(info);
      console.log(event);
    },
    totalVotes() {
      return this.submissions.reduce((totalVotes, submission) => {
        return totalVotes + submission.votes;
      }, 0);
    },
  },
});

// Liefert die Instanz zur Root-Component zurück
const vm = app.mount("#app");
