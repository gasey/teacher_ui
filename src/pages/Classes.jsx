import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubjectCard from "../components/SubjectCard";
import SearchBar from "../components/SearchBar";
import api from "../api/apiClient";
import "../styles/classes.css";

export default function Classes() {
  const { batchId } = useParams(); // this is actually subjectId
  const [hoveredTitle, setHoveredTitle] = useState("Assignments");
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await api.get(
          `/courses/subjects/${batchId}/dashboard/`
        );
        setDashboard(res.data);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    }

    if (batchId) fetchDashboard();
  }, [batchId]);

  if (loading) return <div>Loading...</div>;
  if (!dashboard) return <div>No data found.</div>;

  const base = `/teacher/classes/${batchId}`;

  return (
    <div className="classes-wrapper">
      <div className="classes-container">

        <div className="classes-top">
          <h2>
            {dashboard.name} — {hoveredTitle}
          </h2>
          <SearchBar />
        </div>

        <div className="classes-grid">
          <SubjectCard
            title="Assignments"
            count={dashboard.assignments.total}
            label="Tasks"
            path={`${base}/assignments`}
            onHover={() => setHoveredTitle("Assignments")}
          />
          <SubjectCard
            title="Quiz"
            count={dashboard.quizzes.total}
            label="Tests"
            path={`${base}/quizzes`}
            onHover={() => setHoveredTitle("Quiz")}
          />
          <SubjectCard
            title="Study Materials"
            count={dashboard.studyMaterialsCount || 0}
            label="Resources"
            path={`${base}/study-materials`}
            onHover={() => setHoveredTitle("Study Materials")}
          />
          <SubjectCard
            title="Session Recordings"
            count={dashboard.recordingsCount || 0}
            label="Recordings"
            path={`${base}/session-recordings`}
            onHover={() => setHoveredTitle("Session Recordings")}
          />
          <SubjectCard
            title="Live Sessions"
            count={dashboard.upcomingSessions?.length || 0}
            label="Upcoming"
            path={`${base}/live-sessions`}
            onHover={() => setHoveredTitle("Live Sessions")}
          />
        </div>

      </div>
    </div>
  );
}