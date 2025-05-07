import { useState, useEffect } from 'react';
import PrimeTable from '../common/PrimeTable'
import { getUsers } from '../../service/userService';
import {
    Heading,
    Button,
    HStack,
    Flex,
    useToast,
    Stack
} from "@chakra-ui/react";
const UserList = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const toast = useToast();
    const fetchUsers = (page, limit) => {
        let skip = page * limit
        getUsers({ skip, limit })
            .then(response => {
                const filteredUsers = response.data.users.map((user) => ({
                    id: user.id,
                    username: user.firstName,
                    companyName: user.company.name,
                    Role: user.role,
                    country: user.address.country,
                }));
                setUsers(filteredUsers);
            })
            .catch(error => {
                setError('Error fetching users');
            });
    };
    useEffect(() => {
        fetchUsers(0, 250);
    }, []);
    const handleRefresh = async () => {
        fetchUsers(0, 250);
        toast({
            title: "Refreshed successfully",
            description: "Data has been refreshed.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
        });
    };

    const handleAddUser = () => {
        let newUser = {}
        newUser.id = 0
        newUser.username = "vicash"
        newUser.companyName = "Avivoai"
        newUser.Role = "Developer"
        newUser.country = "India"
        setUsers((prev) => [newUser, ...prev]);
        toast({
            title: "New User Added",
            description: "User Data updated",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
        });

    };

    return (
        <>
            <Stack spacing={6}>
                <Flex justify="space-between" align="center">
                    <Heading size="lg">User List</Heading>
                    <HStack spacing={3}>
                        <Button colorScheme="blue" onClick={handleRefresh}>Refresh</Button>
                        <Button spacing={3} colorScheme="green" onClick={handleAddUser}>Add User</Button>
                    </HStack>
                </Flex>

                <PrimeTable data={users} setUsers={setUsers} />
            </Stack>
        </>
    )

}
export default UserList