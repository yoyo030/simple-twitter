import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://ac-twitter-project.herokuapp.com/api'




export const  apiHelper = axios.create({
  baseURL,

  validateStatus: function (status) {
      return status <= 500; // Resolve only if the status code is less than 500
    }
});

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})



