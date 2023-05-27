import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { DateTime } from "luxon";

export type Viewer = {
  id: string;
  username: string;
  created_at: string;
  updated_at: string;
  has_avatar?: boolean;
};

interface ViewerListProps {
  viewers: Viewer[];
}

const ViewerList = (props: ViewerListProps) => {
  const formatDateTime = (dateTime: string) => {
    return DateTime.fromISO(dateTime).toLocaleString(DateTime.DATETIME_FULL);
  };

  return (
    <div className="grid auto-rows-auto divide-y-2 w-full max-w-6xl my-8 overflow-x-auto">
      <div className="w-full border border-gray-200 p-4 flex items-center space-x-2">
        <IconSearch />
        <input
          type="text"
          placeholder="Search for viewer"
          className="w-full p-2"
        />
      </div>
      <table className="table table-auto w-full text-right border-separate border-spacing-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Viewer</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {props.viewers.map((viewer, index) => (
            <tr key={viewer.id}>
              <td>{index + 1}</td>
              <td>{viewer.username}</td>
              <td>{formatDateTime(viewer.created_at)}</td>
              <td>{formatDateTime(viewer.updated_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getViewers = async (): Promise<Viewer[]> => {
  try {
    const res = await fetch(`${process.env.API_URL}/users`);
    const data = (await res.json()) as { viewers: Viewer[] };
    return data.viewers;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default ViewerList;
