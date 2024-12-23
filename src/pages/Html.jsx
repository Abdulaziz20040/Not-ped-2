import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Drawer, Form, message } from "antd";
import { FaPlus } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import "../App.css";
import nodate from "../remove.png";

function Html() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imgUrl: "",
    eslatma: "",
    kod: "",
  });

  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const dataContainerRef = useRef(null);

  const [form] = Form.useForm(); // Add this line to initialize form

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchData = async (query = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://c0adcbfd27d5ecc2.mokky.dev/html"
      );
      const data = response.data;
      const filtered = data.filter(
        (item) =>
          item.name?.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
      setNoData(filtered.length === 0);
    } catch (error) {
      console.error("Xato yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (dataContainerRef.current) {
      dataContainerRef.current.scrollTop =
        dataContainerRef.current.scrollHeight;
    }
  }, [filteredData]);

  const formatDescription = (description) => {
    if (typeof description !== "string") return "Tavsif mavjud emas";
    const regex = /\*(.*?)\*/g;
    const parts = description.split(regex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span
            key={index}
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              backgroundColor: "red",
              borderRadius: "5px",
              fontWeight: "semibold",
              color: "white",
              padding: "4px",
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleSubmit = async () => {
    // Check if all required fields are filled
    form
      .validateFields()
      .then(async () => {
        try {
          // Sending the form data to the API
          const response = await axios.post(
            "https://c0adcbfd27d5ecc2.mokky.dev/html",
            formData
          );

          // Updating the filtered data to include the new entry
          setFilteredData((prevData) => [...prevData, response.data]);

          // Closing the drawer after submitting the data
          setOpenDrawer(false);

          // Reset the form data to its initial state
          setFormData({
            name: "",
            description: "",
            imgUrl: "",
            eslatma: "",
            kod: "",
          });

          // Reset the form fields
          form.resetFields();

          // Success message
          message.success("Ma'lumot muvaffaqiyatli qo'shildi!");
        } catch (error) {
          console.error("Xatolik:", error);
          message.error("Ma'lumot qo'shishda xatolik yuz berdi.");
        }
      })
      .catch((errorInfo) => {
        // If form validation fails, show an error message
        message.error("Iltimos, barcha maydonlarni to'ldiring!");
      });
  };

  return (
    <div className="bg-[#0e1212] text-white">
      <div
        className="flex items-center justify-between bg-[#00393F] text-white p-4"
        style={{ height: "60px" }}
      >
        <div className="flex items-center gap-3">
          <Button
            className="add-button"
            icon={<FaPlus style={{ fontSize: "20px" }} />}
            onClick={showDrawer}
            style={{ display: "block", padding: "8px" }}
          />
          <h2 className="font-bold m-0 text-lg sm:text-xl md:text-2xl hidden sm:block">
            Ma'lumot qo'shish
          </h2>
        </div>

        <div className="flex items-center w-[400px] justify-center relative">
          <Input
            className="rounded-full w-1/2 h-11 bg-[#EDEFF3] border-none p-3 text-lg sm:w-full sm:text-sm"
            placeholder="Qidirish"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IoMdSearch className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-lg text-[#8D9BA8]" />
        </div>
      </div>

      <div
        ref={dataContainerRef}
        className="overflow-y-auto p-4 mt-2 container"
        style={{ height: "calc(100vh - 140px)" }}
      >
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : noData ? (
          <div className="text-center">
            <div className="flex justify-center">
              <img src={nodate} alt="" />
            </div>
            <Button
              className="premium-button"
              type="primary"
              onClick={showDrawer}
            >
              Qo'shish
            </Button>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
              {filteredData.map((item) => (
                <div
                  className="bg-[#1F2628] p-4 rounded-lg shadow-lg w-full max-w-[700px]"
                  key={item.id}
                >
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-2 text-sm sm:text-base md:text-lg">
                    <span className="font-bold text-[#14ffff]">Nomi:</span>{" "}
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="mb-2 text-xs sm:text-sm md:text-base">
                      <span className="font-bold text-[#14ffff]">Malumot:</span>{" "}
                      {formatDescription(item.description)}
                    </p>
                  )}

                  <div className="mb-4">
                    {item.imgUrl && (
                      <img
                        src={item.imgUrl}
                        alt="Rasm"
                        className="w-full h-auto rounded-lg"
                      />
                    )}
                    {item.eslatma && (
                      <p className="text-xs sm:text-sm md:text-base">
                        <span className="font-bold">Eslatma:</span>{" "}
                        {item.eslatma}
                      </p>
                    )}
                  </div>

                  {item.kod && (
                    <MonacoEditor
                      height="200px"
                      language="javascript"
                      value={item.kod}
                      options={{
                        theme: "vs-dark", // Already set for dark background
                        minimap: { enabled: false },
                        fontSize: 13,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Drawer
        title={<span style={{ color: "white" }}>Ma'lumot qo'shish</span>}
        placement="right"
        width={600}
        onClose={onClose}
        open={openDrawer}
        closable={false} // This will hide the close (X) icon
        className="bg-[#00393ff3]"
        extra={
          <button
            className="border border-[#00ffff] rounded-full p-2 text-white text-sm font-semibold"
            style={{
              backgroundColor: "#00ffff",
              color: "black",
              fontSize: "16px",
              padding: "8px 16px",
              borderRadius: "8px",
            }}
            onClick={handleSubmit}
          >
            Codni qo'shish
          </button>
        }
        style={{
          borderRadius: "16px", // Apply border radius
          overflow: "hidden", // Ensure content doesn't overflow with rounded corners
          backgroundColor: "#00393ff3",
        }}
        bodyStyle={{
          position: "relative",
          color: "white", // Set the text color to white
          overflowY: "scroll", // Enable scrolling
        }}
      >
        <div className="hide-scrollbar h-[650px]">
          <Form form={form} layout="vertical">
            {/* Name Field - Required */}
            <Form.Item
              label={<span style={{ color: "white" }}>Name</span>}
              name="name"
              rules={[{ required: true, message: "Iltimos, nomini kiriting!" }]}
            >
              <Input
                name="name"
                placeholder="Nomi"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Item>

            {/* Description Field - Required */}
            <Form.Item
              label={<span style={{ color: "white" }}>Description</span>}
              name="description"
              rules={[
                { required: true, message: "Iltimos, tavsifni kiriting!" },
              ]}
            >
              <Input.TextArea
                name="description"
                rows={4}
                placeholder="Tavsif"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Item>

            {/* Image URL Field - Optional */}
            <Form.Item
              label={<span style={{ color: "white" }}>Image URL</span>}
            >
              <Input
                name="imgUrl"
                placeholder="Rasm URL"
                value={formData.imgUrl}
                onChange={handleChange}
              />
            </Form.Item>

            {/* Eslatma Field - Optional */}
            <Form.Item label={<span style={{ color: "white" }}>Eslatma</span>}>
              <Input.TextArea
                name="eslatma"
                rows={4}
                placeholder="Eslatma"
                value={formData.eslatma}
                onChange={handleChange}
              />
            </Form.Item>

            {/* Kod Field - Required */}
            <Form.Item
              label={<span style={{ color: "white" }}>Kod</span>}
              name="kod"
            >
              <Input.TextArea
                name="kod"
                rows={4}
                placeholder="Kod"
                value={formData.kod}
                onChange={handleChange}
              />
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </div>
  );
}

export default Html;
