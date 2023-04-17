export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
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
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
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
    username: "Snow",
    img: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z3V5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    status: "Accepted",
    phone_number: "+961 76 646 537",
    age: 35,
    number_rides: 12,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z3V5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    phone_number: "+961 76 123 537",
    status: "Waiting",
    age: 42,
    number_rides: 12,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    phone_number: "+961 76 646 456",
    status: "Cancelled",
    age: 45,
    number_rides: 12,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://www.bolde.com/wp-content/uploads/2020/09/iStock-1269607964-400x400.jpg",
    phone_number: "+961 03 646 537",
    status: "Accepted",
    age: 16,
    number_rides: 12,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    phone_number: "+961 81 646 537",
    status: "Cancelled",
    age: 22,
    number_rides: 12,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3V5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    phone_number: "+961 76 412 537",
    status: "Accepted",
    age: 15,
    number_rides: 12,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://www.cl.cam.ac.uk/~ga384/profile.jpg",
    phone_number: "+961 76 123 456",
    status: "Waiting",
    age: 44,
    number_rides: 12,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://www.gannett-cdn.com/presto/2020/09/25/USAT/f4d10bd0-7f11-413f-9d69-c67d8e7d7f03-Arif_Zahir.jpg",
    phone_number: "+961 03 237 537",
    status: "Accepted",
    age: 36,
    number_rides: 12,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    phone_number: "+961 81 123 537",
    status: "Waiting",
    age: 65,
    number_rides: 12,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://guyrothblum.files.wordpress.com/2014/11/guy_rothblum_square.jpg",
    phone_number: "+961 76 646 536",
    status: "Accepted",
    age: 65,
    number_rides: 12,
  },
];