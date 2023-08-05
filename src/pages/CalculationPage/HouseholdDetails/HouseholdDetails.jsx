import React from "react";
import { useDispatch, useSelector } from "react-redux"; // <-- Redux imports
import { Input, Select, Alert } from "antd";
import {
  HomeOutlined,
  DollarOutlined,
  ShopOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import "./style.scss";
import { updateField } from "../../../reduxToolkit/slices/solarFormSlice";

const { Option } = Select;
const HouseholdDetails = () => {
  const dispatch = useDispatch();
  const householdDetails = useSelector(
    (state) => state.solarForm.householdDetails
  ); // <-- Get the Redux state

  const handleValueChange = (field, value) => {
    dispatch(updateField({ section: "householdDetails", field, value }));
  };

  return (
    <div className="unique-household-details">
      <h2>Household Data Center</h2>
      <Alert
        message="Enter unique details about your home energy usage."
        type="info"
        showIcon
        className="instruction-alert"
      />

      <div className="grid-container">
        <div className="input-group">
          <HomeOutlined className="icon" />
          <label>Postcode</label>
          <Input
            value={householdDetails.postcode}
            onChange={(e) => handleValueChange("postcode", e.target.value)}
            placeholder="Home Zip Code"
          />
        </div>

        <div className="input-group">
          <DollarOutlined className="icon" />
          <label>Avg. Bill</label>
          <Input
            value={householdDetails.avgBill}
            onChange={(e) => handleValueChange("avgBill", e.target.value)}
            placeholder="Regular Billing Amount"
            prefix="$"
          />
        </div>

        <div className="input-group">
          <ShopOutlined className="icon" />
          <label>Retailer</label>
          <Select
            value={householdDetails.retailer}
            onChange={(value) => handleValueChange("retailer", value)}
            placeholder="Choose Energy Supplier"
          >
            <Option value="AGL">AGL</Option>
            {/* Add more retailers as needed */}
          </Select>
        </div>

        <div className="input-group">
          <CalendarOutlined className="icon" />
          <label>Bill Cycle</label>
          <Select
            value={householdDetails.billFrequency}
            onChange={(value) => handleValueChange("billFrequency", value)}
            placeholder="Billing Frequency"
          >
            <Option value="Quarterly">Quarterly</Option>
            {/* Add more frequencies as needed */}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default HouseholdDetails;
