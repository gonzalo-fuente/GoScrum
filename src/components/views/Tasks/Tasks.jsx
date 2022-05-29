import { useState } from "react";

import Header from "../../Header/Header";
import CreateEditTask from "../../CreateEditTask/CreateEditTask";
import ViewTasks from "../../ViewTasks/ViewTasks";

const Tasks = () => {
  const [editId, setEditId] = useState(null);

  return (
    <>
      <Header />
      <main className="px-4 mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <CreateEditTask editId={editId} setEditId={setEditId} />
        <ViewTasks setEditId={setEditId} />
      </main>
    </>
  );
};

export default Tasks;
