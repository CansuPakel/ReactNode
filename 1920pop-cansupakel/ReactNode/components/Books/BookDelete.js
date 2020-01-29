import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import axios from "axios";
import url from "../../utils/url";
import { useRouter } from "next/router";
export default function BookDelete({ _id }) {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  async function deleteBook() {
    await axios.delete(`${url}api/book`, { params: { _id } });
    router.push("/");
  }
  return (
    <div>
      <Button negative floated="right" onClick={() => setModal(true)}>
        Delete book
      </Button>
      <Modal open={modal}>
        <Modal.Header>Delete book</Modal.Header>
        <Modal.Content>Do you want to delete this book?</Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModal(false)}>Cancel</Button>
          <Button negative onClick={deleteBook}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
