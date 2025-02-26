
# Runs all scripts in correct order
all: create_coach_data create_slot_data create_appointment_data create_appointment_notes_data
	@echo "All scripts have been executed successfully."

# Individual targets for each script
create_coach_data:
	@echo "-- 1. Running create_coach_data.py..."
	python3 create_coach_data.py
	@echo "-- 1. create_coach_data completed."

create_slot_data: create_coach_data
	@echo "-- 2. Running create_slot_data.py..."
	python3 create_slot_data.py
	@echo "-- 2. create_slot_data.py completed!"

create_appointment_data: create_slot_data
	@echo "-- 3. Running create_appointment_data.py..."
	python3 create_appointment_data.py
	@echo "-- 3. create_appointment_data completed!"

create_appointment_notes_data: create_appointment_data
	@echo "-- 4. Running create_appointment_notes_data.py..."
	python3 create_appointment_notes_data.py
	@echo "-- 4. create_appointment_notes_data completed!"