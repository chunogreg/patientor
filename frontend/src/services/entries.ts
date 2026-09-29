import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry, EntryWithoutId } from "../types";

const create = async (id: string, newEntry: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    newEntry,
  );
  return data;
};

export default { create };
