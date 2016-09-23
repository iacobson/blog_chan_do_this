let List = {
  init(socket){
    socket.connect()
    let channel = socket.channel("lists")
    channel.join()
      .receive("ok", resp => {
        console.log("here will display the index")
        //this.index
      })
      .receive("error", reason => {
        console.log("Error joining channel: ", reason)
      })


  }
}

export default List
