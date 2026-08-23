import { useUser } from "../../context/User";
import { maskZipCode } from "../../utils/masks";
import { Form } from "../Form";

export const UserAddress = ({ user }) => {
  const { updateSubUser } = useUser();
  return (
    <>
      <Form.ContainerInput size="xx-large">
        <Form.Label text={"Rua"} htmlFor={"street"}></Form.Label>
        <Form.Input
          placeholder={"ex.: Barão do Rio Branco"}
          type={"text"}
          id={"street"}
          value={user?.address?.street || ""}
          onChange={(e) => updateSubUser("address", "street", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput>
        <Form.Label text={"Número"} htmlFor={"number"}></Form.Label>
        <Form.Input
          placeholder={"0000"}
          type={"number"}
          id={"number"}
          value={user?.address?.number || ""}
          onChange={(e) => updateSubUser("address", "number", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput size="medium">
        <Form.Label text={"Cidade"} htmlFor={"city"}></Form.Label>
        <Form.Input
          placeholder={"ex.: Joinville"}
          type={"text"}
          id={"city"}
          value={user?.address?.city || ""}
          onChange={(e) => updateSubUser("address", "city", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput>
        <Form.Label text={"Estado | UF"} htmlFor={"state"}></Form.Label>
        <Form.Input
          placeholder={"ex.: SC"}
          type={"text"}
          id={"state"}
          value={user?.address?.state || ""}
          onChange={(e) => updateSubUser("address", "state", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput>
        <Form.Label text={"CEP"} htmlFor={"zipCode"}></Form.Label>
        <Form.Input
          placeholder={"00000-000"}
          type={"text"}
          id={"zipCode"}
          value={maskZipCode(user?.address?.zipCode) || ""}
          onChange={(e) =>
            updateSubUser("address", "zipCode", maskZipCode(e.target.value))
          }
        />
      </Form.ContainerInput>
    </>
  );
};
