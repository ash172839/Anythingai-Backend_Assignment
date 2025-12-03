import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

  
  async function loadTasks() {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  }

  
  async function createTask(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/tasks", form);
      setForm({ title: "", description: "" });
      loadTasks();
    } catch (err) {
      console.error("Error creating task", err);
    }
  }

 
  async function deleteTask(id: string) {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  
  function startEdit(task: Task) {
    setEditId(task._id);
    setEditForm({ title: task.title, description: task.description });
  }

  
  async function updateTask(e: React.FormEvent) {
    e.preventDefault();

    if (!editId) return;

    try {
      await api.put(`/tasks/${editId}`, editForm);
      setEditId(null);
      loadTasks();
    } catch (err) {
      console.error("Update failed", err);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">

      
      <Card>
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={createTask} className="space-y-3">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <Button type="submit">Add Task</Button>
          </form>
        </CardContent>
      </Card>

     
      <Card>
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
        </CardHeader>

        <CardContent>
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((t) => (
                <div
                  key={t._id}
                  className="border p-3 rounded space-y-2"
                >
                  {editId === t._id ? (
                    
                    <form onSubmit={updateTask} className="space-y-2">
                      <Input
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                      />
                      <Input
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                      />

                      <div className="flex gap-2">
                        <Button type="submit">Save</Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditId(null)}
                          type="button"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                   
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{t.title}</p>
                        <p className="text-sm text-gray-600">
                          {t.description}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => startEdit(t)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="destructive"
                          onClick={() => deleteTask(t._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
