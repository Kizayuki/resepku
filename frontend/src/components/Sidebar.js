import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
      <h5 className="text-center">Dashboard Admin Resepku</h5>
      <ListGroup variant="flush" className="mt-4">
        <ListGroup.Item
          action
          className="bg-primary text-white border-0"
          onClick={() => navigate('/dashboard')}
        >
          <i className="bi bi-house-door-fill me-2"></i> Dashboard
        </ListGroup.Item>
        <ListGroup.Item
          action
          className="bg-primary text-white border-0"
          onClick={() => navigate('/data-user')}
        >
          <i className="bi bi-person-fill me-2"></i> Data User
        </ListGroup.Item>
        <ListGroup.Item
          action
          className="bg-primary text-white border-0"
          onClick={() => navigate('/history')}
        >
          <i className="bi bi-table me-2"></i> Riwayat Login
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;