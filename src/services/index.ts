/**
 * Services Entry Point
 * Export all services from one place
 */

export { httpClient } from './http'
export { authService } from './auth'
export { attendanceService } from './attendance'

// Re-export types
export type { User, LoginRequest, LoginResponse } from './auth'
export type {
  Attendance,
  CheckInOutRequest,
  CheckInOutResponse,
  TodayAttendanceResponse,
  AttendanceHistoryResponse,
} from './attendance'