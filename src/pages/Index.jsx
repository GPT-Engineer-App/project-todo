import { useState } from "react";
import { Box, Button, Input, List, ListItem, Text, VStack, Heading, IconButton } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");
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

  const handleEditTask = (index, task) => {
    setEditIndex(index);
    setEditText(task);
  };

  const handleSaveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editText;
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditText("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (editIndex !== -1) {
        handleSaveEdit(editIndex);
      } else {
        handleAddTask();
      }
    }
  };

  return (
    <VStack p={8}>
      <Heading mb={6}>Project Management Todo App</Heading>
      <Box w="100%" maxW="500px">
        <Input placeholder="Add a new task..." value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <Button leftIcon={<FaPlus />} colorScheme="blue" mt={2} onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>
      <List spacing={3} mt={6} w="100%" maxW="500px">
        {tasks.map((task, index) => (
          <ListItem key={index} p={2} shadow="md" borderWidth="1px" display="flex" justifyContent="space-between" alignItems="center">
            <Text>{task}</Text>
            {editIndex === index ? <Input value={editText} onChange={(e) => setEditText(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSaveEdit(index)} /> : <Text>{task}</Text>}
            <IconButton icon={<FaEdit />} isRound="true" onClick={() => handleEditTask(index, task)} aria-label="Edit task" />
            <IconButton icon={<FaTrash />} isRound="true" onClick={() => handleDeleteTask(index)} aria-label="Delete task" />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;
