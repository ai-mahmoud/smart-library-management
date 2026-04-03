cmake_minimum_required(VERSION 3.14)
project(SmartLibraryBackend)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Use FetchContent to automatically download dependencies during build
include(FetchContent)

# Fetch cpp-httplib
FetchContent_Declare(
  httplib
  GIT_REPOSITORY https://github.com/yhirose/cpp-httplib.git
  GIT_TAG v0.14.1
)
FetchContent_MakeAvailable(httplib)

# Fetch nlohmann/json for JSON parsing
FetchContent_Declare(
  json
  GIT_REPOSITORY https://github.com/nlohmann/json.git
  GIT_TAG v3.11.3
)
FetchContent_MakeAvailable(json)

# Create the executable
add_executable(library_server server.cpp)

# Link the libraries
target_link_libraries(library_server PRIVATE httplib::httplib nlohmann_json::nlohmann_json)

# If on Windows, link required socket libraries
if (WIN32)
    target_link_libraries(library_server PRIVATE ws2_32 crypt32)
endif()
