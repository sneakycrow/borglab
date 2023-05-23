import { IconSquare, IconSquareCheck } from "@tabler/icons-react";
import React from "react";

type Viewer = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  hasAvatar: boolean;
};

const viewerList: Viewer[] = [
  {
    id: "1",
    name: "Fake Charborg",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
    hasAvatar: false,
  },
  {
    id: "2",
    name: "Fake Chickenfoot",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
    hasAvatar: true,
  },
];

const ViewerList = () => {
  return (
    <div className="grid auto-rows-auto divide-y-2 w-full max-w-3xl my-8 overflow-x-auto">
      <div>
        <input type="text" placeholder="Search for viewer" />
      </div>
      <table className="table table-compact w-full text-right">
        <thead>
          <tr>
            <th>#</th>
            <th>Viewer</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Registered Avatar</th>
          </tr>
        </thead>
        <tbody>
          {viewerList.map((viewer, index) => (
            <tr key={viewer.id}>
              <th>{index + 1}</th>
              <td>{viewer.name}</td>
              <td>{viewer.createdAt}</td>
              <td>{viewer.updatedAt}</td>
              <td className="flex justify-end">
                {viewer.hasAvatar ? (
                  <span className="flex space-x-2">
                    <a href="/#" className="underline text-blue-600">
                      View
                    </a>
                    <a href="/#" className="underline text-red-600">
                      Delete
                    </a>
                    <IconSquareCheck className="ml-4" />
                  </span>
                ) : (
                  <IconSquare />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewerList;
