import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: (url, success, fail) => {
    axios.get(url)
        .then(value => success && success(value))
        .catch(reason => fail && fail(reason))
  }
}