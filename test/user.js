import test from 'ava'
import axios from 'axios'

test.cb('#user', t => {
  t.plan(1)
  axios.post('http://localhost:1337/user', { username: "brand_new_user"})
    .then(response => {
      console.log(response)
      t.pass()
      t.end()
    }).catch(e => {
      console.log('e is 453453453453453')
       console.log(e.response.status)
      console.log('e ended')
      t.pass(e.response.status, 400, 'status is not 400')
      t.end()
    })
})