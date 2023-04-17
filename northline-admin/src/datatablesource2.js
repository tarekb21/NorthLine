export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 200,
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
      },
  
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
        field: "destination",
        headerName: "Destination",
        width: 100,
      },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "number_rides",
      headerName: "Number of Rides",
      width: 150,
    },
  ];

//temporary data
export const userRows = [
    {
      id: 1,
      username: "Mbappe",
      img: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z3V5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      status: "Reached_Destination",
      phone_number: "+961 76 646 537",
      email:"Mbappe@gmail.com",
      age: 35,
      destination: "Tripoli",
      number_rides: 20,
    },
    {
      id: 2,
      username: "Jones black",
      img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z3V5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      phone_number: "+961 76 123 537",
      status: "Waiting",
      email:"Jones@gmail.com",
      age: 42,
      destination: "Beirut",
      number_rides: 1,
    },
    {
      id: 3,
      username: "Selena Gomez",
      img: "https://assets.teenvogue.com/photos/62694f32bc31614a17dc03c5/master/pass/GettyImages-1238818670.jpg",
      phone_number: "+961 76 646 456",
      status: "Cancelled",
      email:"Selena@gmail.com",
      age: 45,
      destination: "Saida",
      number_rides: 14,
    },
    {
      id: 4,
      username: "Hailey black",
      img: "https://www.bolde.com/wp-content/uploads/2020/09/iStock-1269607964-400x400.jpg",
      phone_number: "+961 03 646 537",
      status: "Waiting",
      email:"Hailey@gmail.com",
      age: 16,
      destination: "Beirut",
      number_rides: 13,
    },
    {
      id: 5,
      username: "Paul Walker",
      img: "https://m.media-amazon.com/images/M/MV5BMjIwODc0OTk2Nl5BMl5BanBnXkFtZTcwOTQ5MDA0Mg@@._V1_UX178_CR0,0,178,264_AL_.jpg",
      phone_number: "+961 81 646 537",
      status: "Reached_Destination",
      email:"Paul@gmail.com",
      age: 22,
      destination: "Akkar",
      number_rides: 11,
    },
    {
      id: 6,
      username: "David dorosa",
      img: "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3V5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      phone_number: "+961 76 412 537",
      status: "Waiting",
      email:"David@gmail.com",
      age: 15,
      destination: "Milan",
      number_rides: 12,
    },
    {
      id: 7,
      username: "Abraham Linclon",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/1200px-Abraham_Lincoln_O-77_matte_collodion_print.jpg",
      phone_number: "+961 76 123 456",
      status: "Cancelled",
      email:"Abraham@gmail.com",
      age: 44,
      destination: "Jbeil",
      number_rides: 100,
    },
    {
      id: 8,
      username: "Ronaldo",
      img: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
      phone_number: "+961 03 237 537",
      status: "Waiting",
      email:"Ronaldo@gmail.com",
      age: 36,
      destination: "Tripoli",
      number_rides: 15,
    },
    {
      id: 9,
      username: "Messi",
      img: "https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg",
      phone_number: "+961 81 123 537",
      status: "Waiting",
      email:"Messi@gmail.com",
      age: 65,
      destination: "Tripoli",
      number_rides: 16,
    },
    {
      id: 10,
      username: "Tarek",
      img: "https://guyrothblum.files.wordpress.com/2014/11/guy_rothblum_square.jpg",
      phone_number: "+961 76 646 536",
      status: "Cancelled",
      email:"Tarek@gmail.com",
      age: 65,
      destination: "Saida",
      number_rides: 21,
    },
  ];