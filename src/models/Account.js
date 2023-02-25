export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
    // TODO add additional properties if needed
    this.graduated = data.graduated
    this.bio = data.bio
    this.class = data.class
    this.linkedin = data.linkedin
    this.github = data.github
    this.resume = data.resume
    this.coverImg = data.coverImg || 'https://images.unsplash.com/photo-1586829135343-132950070391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80'
  }
}
