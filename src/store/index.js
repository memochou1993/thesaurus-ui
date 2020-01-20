import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    page: 1,
    pageSize: 10,
    term: '',
    subjects: [],
    subject: null,
    fetched: false,
    completed: false,
  },
  mutations: {
    setPage(state, page) {
      state.page = page;
    },
    setTerm(state, term) {
      state.term = term;
    },
    setSubjects(state, subjects) {
      state.subjects = subjects;
    },
    setSubject(state, subject) {
      state.subject = subject;
    },
    setFetched(state, fetched) {
      state.fetched = fetched;
    },
    setCompleted(state, completed) {
      state.completed = completed;
    },
  },
  actions: {
    fetchSubjects({
      state,
      commit,
    }, {
      params,
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: 'subjects',
          params,
        })
          .then(({ data }) => {
            commit('setCompleted', !data.data.length || (data.data.length < state.pageSize));
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            commit('setFetched', true);
          });
      });
    },
    fetchSubject({
      commit,
    }, {
      props,
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `subjects/${props.subjectId}`,
        })
          .then(({ data }) => {
            commit('setSubject', data.data);
            resolve(data);
          })
          .catch((error) => {
            commit('setCompleted', false);
            reject(error);
          })
          .finally(() => {
            commit('setFetched', true);
          });
      });
    },
  },
});
