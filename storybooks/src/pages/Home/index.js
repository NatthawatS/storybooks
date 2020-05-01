import React, { useState, useEffect } from "react";
import firebase from "firebase";
import moment from "moment";
import { Table, Button, Tag } from "antd";
import { PlusOutlined, CheckCircleOutlined } from "@ant-design/icons";
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
    key: "findTap",
    title: "Find Tap",
    dataIndex: "findTap",
    align: "center",
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
    key: "Status",
    title: "status",
    dataIndex: "status",
    align: "center",
    render: (value) =>
      value && (
        <Tag color={value === "Available" ? "green" : "red"}>{value}</Tag>
      ),
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
          {row.status === "Available" ? (
            <Button
              type="primary"
              onClick={async () => {
                const db = firebase.firestore();
                db.collection("library")
                  .doc(value)
                  .update({
                    status: "Borrowed",
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
  console.log(dataFirebase);
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

  // useEffect(() => {
  //   if (dataFirebase.length === 0) {
  //     setLoading(true);
  //     const db = firebase.firestore();
  //     db.collection("library")
  //       .get()
  //       .then((snapshot) => {
  //         const data = snapshot.docs.map((doc) => {
  //           const key = { key: doc.id };
  //           const allRules = { ...key, ...doc.data() };
  //           return allRules;
  //         });
  //         setFirebase(data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log("Error!", error);
  //         setLoading(false);
  //       });
  //   }
  // }, [dataFirebase]);
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
                setDataExport([]);
                setSelectedRowKeys([]);
                setFirebase([]);
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
            Total {dataFirebase.length} item
          </span>
        </div>
        <Table
          rowKey="key"
          className="table-ihg"
          rowSelection={{
            selectedRowKeys,
            getCheckboxProps: (record) => ({
              disabled: record.status === "Available",
            }),
            onChange: (rowKeys, selectedRows) => {
              setSelectedRowKeys(rowKeys);
              setDataExport(selectedRows);
            },
          }}
          // columns={columns}
          columns={columns(getReturn)}
          dataSource={dataFirebase}
          scroll={{ x: "max-content" }}
          // pagination={false}
          loading={loading}
          bordered
        />
      </div>
    </MainLayout>
  );
};

export default Home;
