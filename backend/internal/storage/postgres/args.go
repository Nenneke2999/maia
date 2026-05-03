package postgres

const (
	chatTable = "chat_table"
	userTable = "user_table"

	customersTable        = "customers"
	appHistoryTable       = "app_history"
	creditHistoryTable    = "credit_history"
	insuranceHistoryTable = "insurance_history"
)

const (
	fieldID        = "id"
	fieldSessionID = "session_id"
	fieldS3URL     = "s3_url"
	fieldCreatedAt = "created_at"

	fieldSNILS      = "snils"
	fieldFullName   = "full_name"
	fieldSex        = "sex"
	fieldBirth      = "birth"
	fieldProfession = "profession"
	fieldSalary     = "salary"
	fieldKids       = "kids"
)

var (
	chatTableFields = []string{
		fieldSessionID, fieldS3URL, fieldCreatedAt,
	}
	userTableFields = []string{
		fieldID, fieldSessionID,
	}
)

func tableField(table, field string) string {
	return table + "." + field
}
