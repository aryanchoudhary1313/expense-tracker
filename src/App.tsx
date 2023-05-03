import { useState } from "react";
import Expense from "./components/expense/Expense";
import ExpenseFilter from "./components/expense-filter/ExpenseFilter";
import Form from "./components/form/Form";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Screwdriver",
      amount: 3,
      category: "Utilities",
    },
    {
      id: 2,
      description: "Apples",
      amount: 5,
      category: "Groceries",
    },
    {
      id: 3,
      description: "Trip",
      amount: 450,
      category: "Entertainment",
    },
    {
      id: 4,
      description: "Laptop",
      amount: 1200,
      category: "Utilities",
    },
  ]);

  if (expenses.length === 0) return null;
  const visible = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div className="app">
      <h2>Expense Tracker</h2>
      <div className="mb-5">
        <Form
          onSubmit={(data) =>
            setExpenses([...expenses, { ...data, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <Expense
        expenses={visible}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </div>
  );
}

export default App;
