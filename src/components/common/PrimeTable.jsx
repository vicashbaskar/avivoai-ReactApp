import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Stack,
    Heading,
    Input,
    Select,
    Button,
    HStack,
    Text,
    Flex,
    useToast,
    Box,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";

const PrimeTable = ({ data, setUsers }) => {


    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const toast = useToast();
    const filteredData = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return data.filter((item) =>
            item.username.toLowerCase().includes(term) ||
            item.companyName.toLowerCase().includes(term) ||
            item.Role.toLowerCase().includes(term)
        );
    }, [searchTerm, data]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handleDelete = (id) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        toast({
            title: "User Deleted",
            description: "Data has been Deleted.",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
        });
    };
    return (
        <Stack spacing={4} width="full">
            <HStack>
                <Input
                    placeholder="Search "
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(1);
                    }}
                />
                <Select
                    width="120px"
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setPage(1);
                    }}
                >
                    <option value={5}>5 / page</option>
                    <option value={10}>10 / page</option>
                    <option value={25}>25 / page</option>
                    <option value={50}>50 / page</option>
                </Select>
            </HStack>

            <Box maxHeight="518px" overflowY="auto" border="1px solid #E2E8F0" borderRadius="md">
                <Table variant="striped" size="sm">
                    <Thead>
                        <Tr>
                            {data.length > 0 &&
                                Object.keys(data[0]).map((key, index) => (
                                    <Th key={index}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Th>
                                ))}
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {paginatedData.map((item) => (
                            <Tr key={item.id}>
                                {Object.keys(item).map((key, idx) => (
                                    <Td key={idx}>{item[key]}</Td>
                                ))}
                                <Td>
                                    <Button
                                        colorScheme="red"
                                        size="sm"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <HStack justify="space-between" mt={2}>
                <Text>
                    Page {page} of {totalPages}
                </Text>
                <HStack>
                    <Button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        isDisabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        isDisabled={page === totalPages}
                    >
                        Next
                    </Button>
                </HStack>
            </HStack>
        </Stack>
    );
};

export default PrimeTable;
