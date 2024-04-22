import { useState } from "react";
import { Box, Button, Input, List, ListItem, Text, VStack, Heading, IconButton } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([...tasks, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <VStack p={8}>
      <Heading mb={6}>Project Management Todo App</Heading>
      <Box w="100%" maxW="500px">
        <Input placeholder="Add a new task..." value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" mt={2} onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>
      <List spacing={3} mt={6} w="100%" maxW="500px">
        {tasks.map((task, index) => (
          <ListItem key={index} p={2} shadow="md" borderWidth="1px" display="flex" justifyContent="space-between" alignItems="center">
            <Text>{task}</Text>
            <IconButton icon={<FaTrash />} isRound="true" onClick={() => handleDeleteTask(index)} aria-label="Delete task" />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;
