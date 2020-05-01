import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Table, Button, Tag } from "antd";
import {
  PlusOutlined,
  CheckCircleOutlined,
  InteractionOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { changeSale } from "../../reducers/booking";
import { useHistory } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

const columns = (getReturn) => [
  {
    title: "ISBN (Book ID.)",
    dataIndex: "isbn",
    key: "isbn",
    align: "center",
  },
  {
    key: "bookTitle",
    title: "Name of the book",
    dataIndex: "bookTitle",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    filters: [
      { text: "Available", value: true },
      { text: "Borrowed", value: false },
    ],
    onFilter: (value, record) => {
      console.log(value);
      if (value === true) {
        return record.status === "Available";
      } else {
        return record.status !== "Available";
      }
    },
    render: (value) => {
      if (value === "Available") {
        return (
          <Tag color="green">
            Available <SafetyCertificateOutlined />
          </Tag>
        );
      } else {
        return (
          <Tag color="red">
            Borrowed <InteractionOutlined />
          </Tag>
        );
      }
    },
  },
  {
    key: "Author",
    title: "Author",
    dataIndex: "author",
    align: "center",
  },
  {
    key: "yearIssue",
    title: "Year of issue",
    dataIndex: "yearIssue",
    align: "center",
  },
  {
    key: "Find Tag",
    title: "Find Tag",
    dataIndex: "findTag",
    align: "center",
    render: (value, row) =>
      value && (
        <div>
          {value}( {row.pages} pages)
        </div>
      ),
  },
  {
    key: "size",
    title: "Size",
    dataIndex: "size",
    align: "center",
  },
  {
    key: "startDate",
    title: "Borrow Date",
    dataIndex: "startDate",
    align: "center",
    render: (value, row) =>
      value && (
        <div>
          {value} to
          {row.endDate}
        </div>
      ),
  },
  {
    key: "description",
    title: "Description",
    dataIndex: "description",
    align: "center",
  },
  {
    title: "Return",
    align: "center",
    dataIndex: "key",
    width: 150,
    key: "key",
    render: (value, row) => {
      return (
        <div style={{ fontSize: "11px", textAlign: "center" }}>
          {row.status === "Borrowed" ? (
            <Button
              type="primary"
              onClick={async () => {
                const db = firebase.firestore();
                db.collection("library")
                  .doc(value)
                  .update({
                    status: "Available",
                    startDate: null,
                    endDate: null,
                  })
                  .then(() => {
                    getReturn();
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
              <CheckCircleOutlined />
            </Button>
          ) : null}
        </div>
      );
    },
  },
];

const Home = () => {
  const [dataFirebase, setFirebase] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataExport, setDataExport] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const arrBooking = useSelector((state) => state.booking.book);
  console.log(arrBooking);

  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    db.collection("library")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const result = { ...{ key: doc.id }, ...doc.data() };
          return result;
        });
        setFirebase(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error!", error);
      });
  }, [selectedRowKeys]);

  const getReturn = () => {
    setDataExport([]);
    setSelectedRowKeys([]);
    setFirebase([]);
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Button
          style={{ marginRight: 20 }}
          type="primary"
          ghost
          onClick={async () => {
            await dispatch(changeSale(dataExport));
            await history.push("/BorrowBooks");
          }}
          disabled={!hasSelected}
        >
          Borrow
        </Button>
        <Button
          danger
          type="primary"
          onClick={async () => {
            const db = firebase.firestore();
            const deleteFiles = dataExport.map((items) => {
              db.collection("library").doc(items.key).delete();
            });
            return Promise.all(deleteFiles)
              .then(() => {
                getReturn();
              })
              .catch((e) => {
                console.log(e);
              });
          }}
          disabled={!hasSelected}
        >
          Delete
        </Button>
        <div style={{ flex: 1 }} />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size={13}
          onClick={() => history.push("/AddNewBook")}
        >
          Add new book
        </Button>
      </div>
      <div>
        <div
          style={{
            margin: `16px 16px 16px 0`,
            justifyContent: "space-between",
            flex: 1,
            flexDirection: "row",
            display: "flex",
          }}
        >
          <span style={{ marginLeft: 8 }}>
            Selected {selectedRowKeys.length} items
          </span>
          <span style={{ marginLeft: 8 }}>
            Total {dataFirebase.length} items
          </span>
        </div>
        <Table
          rowKey="key"
          className="table-ihg"
          rowSelection={{
            selectedRowKeys,
            getCheckboxProps: (record) => ({
              disabled: record.status === "Borrowed",
            }),
            onChange: (rowKeys, selectedRows) => {
              setSelectedRowKeys(rowKeys);
              setDataExport(selectedRows);
            },
          }}
          columns={columns(getReturn)}
          dataSource={dataFirebase}
          scroll={{ x: "max-content" }}
          loading={loading}
          bordered
        />
      </div>
    </MainLayout>
  );
};

export default Home;
