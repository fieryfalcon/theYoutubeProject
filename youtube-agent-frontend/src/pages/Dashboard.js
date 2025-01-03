import React, { useState, useEffect } from "react";
import { Button, Typography, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchYouTubeURL } from "../authApipi/authApi";

const { Title, Text } = Typography;

const Dashboard = () => {
  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchYouTubeURL();
        if (response.success) {
          setVideoURL(response.url);
        } else {
          message.error("Failed to fetch video URL.");
        }
      } catch (error) {
        console.error("Error fetching video URL:", error);
        message.error("Error fetching video URL.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Dashboard</Title>
      {loading ? (
        <Spin size="large" />
      ) : videoURL ? (
        <Text>Current YouTube Video URL: {videoURL}</Text>
      ) : (
        <Text>No video is currently playing.</Text>
      )}
      <Button
        type="primary"
        danger
        style={{ marginTop: 16 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
