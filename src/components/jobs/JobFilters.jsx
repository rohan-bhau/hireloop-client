"use client";

import React from 'react';
import { Select, ListBox, TextField, InputGroup } from '@heroui/react';
import {  Magnifier } from '@gravity-ui/icons';

export default function JobFilters({ filters, setFilters }) {
  
  // Handle updates cleanly for any individual filter key
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-8 bg-[#121212] border border-[#232323] p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-end">
      
      {/* 1. Text Search Input */}
      <div className="w-full md:flex-1">
        <TextField className="w-full">
          <span className="text-xs text-neutral-400 font-medium mb-1.5 block">Search Jobs</span>
          <InputGroup className="bg-[#1e1e1e] border border-neutral-800 rounded-xl px-3 py-1 flex items-center gap-2 focus-within:border-neutral-600 transition-colors">
            <InputGroup.Prefix>
              <Magnifier className="w-4 h-4 text-neutral-400" />
            </InputGroup.Prefix>
            <input
              type="text"
              placeholder="Title, company, skills..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm text-neutral-200 placeholder-neutral-500 h-9"
            />
          </InputGroup>
        </TextField>
      </div>

      {/* 2. Job Type Select */}
      <div className="w-full md:w-[200px]">
        <Select 
          onSelectionChange={(selected) => handleFilterChange('type', selected)}
          selectedKey={filters.type}
        >
          <span className="text-xs text-neutral-400 font-medium mb-1.5 block">Job Type</span>
          <Select.Trigger className="bg-[#1e1e1e] border border-neutral-800 rounded-xl px-3 py-2 flex items-center justify-between w-full text-sm text-neutral-300 h-[38px] hover:border-neutral-700 transition-colors">
            <Select.Value>{filters.type || "All Types"}</Select.Value>
            <Select.Indicator className="text-neutral-500 text-xs" />
          </Select.Trigger>
          <Select.Popover className="bg-[#121212] border border-[#232323] rounded-xl shadow-xl mt-1 min-w-[200px] z-50">
            <ListBox className="p-1">
              <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer" id="">All Types</ListBox.Item>
              <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer capitalize" id="full-time">Full-Time</ListBox.Item>
              <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer capitalize" id="contract">Contract</ListBox.Item>
              <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer capitalize" id="part-time">Part-Time</ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* 3. Category Select */}
      <div className="w-full md:w-[200px]">
        <Select
          onSelectionChange={(selected) => handleFilterChange('category', selected)}
          selectedKey={filters.category}
        >
          <span className="text-xs text-neutral-400 font-medium mb-1.5 block">Category</span>
          <Select.Trigger className="bg-[#1e1e1e] border border-neutral-800 rounded-xl px-3 py-2 flex items-center justify-between w-full text-sm text-neutral-300 h-[38px] hover:border-neutral-700 transition-colors">
            <Select.Value>{filters.category || "All Categories"}</Select.Value>
            <Select.Indicator className="text-neutral-500 text-xs" />
          </Select.Trigger>
          <Select.Popover className="bg-[#121212] border border-[#232323] rounded-xl shadow-xl mt-1 min-w-[200px] z-50">
            <ListBox className="p-1">
              <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer" id="">All Categories</ListBox.Item>
              <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer capitalize" id="media">Media & Video</ListBox.Item>
              <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer capitalize" id="engineering">Technology & Engineering</ListBox.Item>
                          <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer capitalize" id="design">Design & Creative</ListBox.Item>
                          <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer capitalize" id="marketing">Marketing & Growth</ListBox.Item>
                          <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer capitalize" id="finance">Finance & Accounting</ListBox.Item>
                          <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer capitalize" id="management">Business & Management</ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* 4. Remote Options Select */}
      <div className="w-full md:w-[180px]">
        <Select
          onSelectionChange={(selected) => handleFilterChange('remoteSetting', selected)}
          selectedKey={filters.remoteSetting}
        >
          <span className="text-xs text-neutral-400 font-medium mb-1.5 block">Work Mode</span>
          <Select.Trigger className="bg-[#1e1e1e] border border-neutral-800 rounded-xl px-3 py-2 flex items-center justify-between w-full text-sm text-neutral-300 h-[38px] hover:border-neutral-700 transition-colors">
            <Select.Value>
              {filters.remoteSetting === "remote" ? "Remote Only" : filters.remoteSetting === "onsite" ? "On-site / Hybrid" : "All Modes"}
            </Select.Value>
            <Select.Indicator className="text-neutral-500 text-xs" />
          </Select.Trigger>
          <Select.Popover className="bg-[#121212] border border-[#232323] rounded-xl shadow-xl mt-1 min-w-[180px] z-50">
            <ListBox className="p-1">
              <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer" id="">All Modes</ListBox.Item>
              <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer" id="remote">Remote Only</ListBox.Item>
              <ListBox.Item className="text-neutral-300 hover:bg-neutral-800 p-2 rounded-lg text-sm cursor-pointer" id="onsite">On-site / Hybrid</ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

    </div>
  );
}