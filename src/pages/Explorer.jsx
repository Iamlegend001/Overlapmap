import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ForceGraph from "../visualizations/ForceGraph";

export default function Explorer() {
  const [activeTab, setActiveTab] = useState("graph");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "graph", label: "Graph View", icon: "📊" },
    { id: "list", label: "List View", icon: "📝" },
    { id: "stats", label: "Statistics", icon: "📈" },
  ];

  // Sample data for the graph visualization
  const graphData = [
    {
      id: "1",
      title: "The Matrix",
      type: "Movie",
      connections: [
        { source: "1", target: "2" },
        { source: "1", target: "3" },
        { source: "1", target: "5" },
      ],
    },
    {
      id: "2",
      title: "Breaking Bad",
      type: "TV Show",
      connections: [
        { source: "2", target: "1" },
        { source: "2", target: "4" },
        { source: "2", target: "6" },
      ],
    },
    {
      id: "3",
      title: "1984",
      type: "Book",
      connections: [
        { source: "3", target: "1" },
        { source: "3", target: "4" },
        { source: "3", target: "7" },
      ],
    },
    {
      id: "4",
      title: "Dune",
      type: "Book",
      connections: [
        { source: "4", target: "2" },
        { source: "4", target: "3" },
        { source: "4", target: "8" },
      ],
    },
    {
      id: "5",
      title: "Inception",
      type: "Movie",
      connections: [
        { source: "5", target: "1" },
        { source: "5", target: "6" },
        { source: "5", target: "8" },
      ],
    },
    {
      id: "6",
      title: "Game of Thrones",
      type: "TV Show",
      connections: [
        { source: "6", target: "2" },
        { source: "6", target: "5" },
        { source: "6", target: "7" },
      ],
    },
    {
      id: "7",
      title: "The Lord of the Rings",
      type: "Book",
      connections: [
        { source: "7", target: "3" },
        { source: "7", target: "6" },
        { source: "7", target: "8" },
      ],
    },
    {
      id: "8",
      title: "The Dark Knight",
      type: "Movie",
      connections: [
        { source: "8", target: "4" },
        { source: "8", target: "5" },
        { source: "8", target: "7" },
      ],
    },
  ];

  // Filter data based on search query and generate corresponding links
  const filteredGraphData = useMemo(() => {
    const nodes = graphData;
    const links = graphData.flatMap((d) => d.connections || []);

    if (!searchQuery.trim()) {
      // If no search query, return all nodes and links
      return { nodes, links };
    }

    const query = searchQuery.toLowerCase().trim();

    // Find nodes that match the search query (by title or type)
    const matchingNodes = nodes.filter((node) => {
      if (!node || !node.title || !node.type) return false;
      return (
        node.title.toLowerCase().includes(query) ||
        node.type.toLowerCase().includes(query)
      );
    });

    // Identify all nodes connected to the matching nodes
    const connectedNodeIds = new Set();
    matchingNodes.forEach((node) => {
      if (!node || !node.id) return;
      connectedNodeIds.add(node.id);
    });

    // Add connected node IDs to the set if they are involved in a link with a matching node
    links.forEach((link) => {
      if (link && link.source && link.target) {
        if (
          connectedNodeIds.has(link.source) ||
          connectedNodeIds.has(link.target)
        ) {
          connectedNodeIds.add(link.source);
          connectedNodeIds.add(link.target);
        }
      }
    });

    // Filter nodes to include only matching nodes and their directly connected neighbors
    const filteredNodes = nodes.filter((node) => connectedNodeIds.has(node.id));

    // Create a map of filtered nodes by ID for efficient lookup
    const filteredNodesMap = new Map(
      filteredNodes.map((node) => [node.id, node])
    );

    // Filter links to include only those where both source and target nodes are in the filteredNodes list
    const filteredLinks = links.filter((link) => {
      if (!link || !link.source || !link.target) return false;
      return (
        filteredNodesMap.has(link.source) && filteredNodesMap.has(link.target)
      );
    });

    return { nodes: filteredNodes, links: filteredLinks };
  }, [searchQuery, graphData]);

  const recommendations = [
    { id: 1, title: "The Matrix", type: "Movie", shared: 3 },
    { id: 2, title: "Breaking Bad", type: "TV Show", shared: 5 },
    { id: 3, title: "1984", type: "Book", shared: 2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-6 md:p-12"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800"
      >
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Your Recommendation Explorer
        </motion.h2>

        {/* Search Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies, books, or TV shows..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
            {searchQuery && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {filteredGraphData.nodes.length} results
              </div>
            )}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary/20 text-primary border border-primary/50"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === "graph" && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full h-[600px] bg-gray-800/30 rounded-xl border border-gray-700 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <ForceGraph data={filteredGraphData} />
          </motion.div>
        )}

        {activeTab === "list" && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {recommendations.map((item) => (
              <motion.div
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-primary">{item.shared} shared</span>
                    <button className="p-2 hover:bg-gray-700/50 rounded-full transition-colors">
                      <span className="text-xl">💬</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "stats" && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { label: "Total Recommendations", value: "156", icon: "📚" },
              { label: "Shared Items", value: "42", icon: "🤝" },
              { label: "Active Friends", value: "12", icon: "👥" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
