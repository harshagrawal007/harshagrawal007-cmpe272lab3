import { gql } from 'apollo-boost';

const addUserMutation = gql`
    mutation addUser($firstname: String, $lastname: String, $username: String,$password:String,$type:String){
        addUser(firstname: $firstname, lastname: $lastname, username: $username, password:$password,type:$type){
            firstname
            lastname
            username
            type
            error
        }
    }
`;

const updateUserMutation = gql`
    mutation updateUser($firstname: String, $lastname: String,$username:String,$location: String,$gender:String,$about:String,$phone:String,$company:String,$languages:String){
        updateUser(firstname: $firstname, lastname: $lastname,username: $username,location:$location,about:$about,gender:$gender,phone:$phone,company:$company,languages:$languages){
            error
        }
    }
`;
const addBookingMutation = gql`
    mutation addBooking($pid: String, $tid: String,$oid:String,$arrival: String,$depart:String,$guests:String,$headline:String){
        addBooking(pid: $pid, tid: $tid,oid: $oid,arrival:$arrival,depart:$depart,guests:$guests,headline:$headline){
            error
            pid
            tid
            oid
            arrival
            depart
            guests
            headline
        }
    }
`;

export { addUserMutation, updateUserMutation,addBookingMutation };